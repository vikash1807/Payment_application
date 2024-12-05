const express = require('express')
const router = express.Router();
const z = require('zod');
const { User } = require('../db');
const JWT_SECRET = require('../config');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middlewares/authMiddleware');

const signupSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    username : z.string().email(),
    password : z.string()
})
const updateSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    password : z.string()
})

// router.get('/', (req,res) => {
//     res.json('/api/v1/user router has been hit');
// })

router.post('/signup', async (req,res)=>{
    const { success } = signupSchema.safeParse(req.body);
    if(!success) {
        res.status(411).json({
            msg : "email already taken / incorrect inputs"
        });
    }

    const userExists = await User.findOne({
        username : req.body.username
    })

    if(userExists) {
        res.status(409).json({
            msg : 'email already taken'
        })
    }
    const newUser = await User.create({
        firstName : req.body.firstName,
        lastName  : req.body.lastName,
        username : req.body.username,
        password : req.body.password
    });

    const token = jwt.sign({userId : newUser._id}, JWT_SECRET);
    // const decoded = jwt.decode(token);
    // console.log(decoded);
    res.json({
        msg : 'user created successfully',
        token : token
    })
})

router.put('/', authMiddleware, async (req,res) => {
    const userId = req.userId;
    const { success } = updateSchema.safeParse(req.body);
    if(!success) {
        res.status(411).json({msg : 'error while updating information'});
    }
    console.log(userId);
    await User.updateOne({_id : userId }, req.body);
    res.json('information updated successfully');
})

router.get('/bulk', (req,res) => {
    
})
router.get('/signin', authMiddleware, (req, res) => {
    res.send('welcome user');
})
module.exports = router;