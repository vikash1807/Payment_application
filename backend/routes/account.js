const express = require('express');
const mongoose = require('mongoose');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { Account } = require('../db');
const router = express.Router();

router.get('/balance', authMiddleware, async (req,res) => {
    try{
        const userId = req.userId;
        const account = await Account.findOne({userId : userId});
        res.json({
            balance : account.balance
        })
    } catch(error) {
        console.error("error message", error.message);
    }
})

router.post('/transfer', authMiddleware, async (req,res) => {

    const session = await mongoose.startSession();
    session.startTransaction();   //start transaction
    try{
        const {receiverId, amount }  = req.body;
        const senderAccount = await Account.findOne({userId : req.userId}).session(session);
        if(amount < 0) {
            throw new Error('amount should not be negative');
        }
        if(!senderAccount || senderAccount.balance < amount) {
            throw new Error('insufficient balance or user account not found')
        }

        const receiverAccount = await Account.findOne({userId : receiverId}).session(session);
        if(!receiverAccount) {
            throw new error('receiver account does not exist');
        }

        await Account.updateOne({userId : req.userId}, {$inc : {balance : -amount}}).session(session);   
        await Account.updateOne({userId : receiverId}, {$inc : {balance : amount}}).session(session);  

        await session.commitTransaction(); // made a blunder by missing await here.
        res.status(200).json('transaction successfull');
    } catch(error) {
        await session.abortTransaction();     
        res.status(500).json({ error: error.message });
    } finally {
        session.endSession();
    }
})

module.exports = router;