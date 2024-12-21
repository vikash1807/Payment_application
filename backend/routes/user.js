const express = require('express')
const router = express.Router();
const z = require('zod');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const { User, Account } = require('../db');
const { authMiddleware } = require('../middlewares/authMiddleware');

const signupSchema = z.object({
    firstName : z.string(),
    lastName : z.string(),
    username : z.string().email(),
    password : z.string()
})

router.get('/info', authMiddleware, async (req,res) => {
    try {
        const userId = req.userId;
        const user = await User.findOne({_id : userId});
        if(!user) {
            return res.status(411).json('user not found');
        }
        return res.json({user});
    } catch (error) {
        console.error("error message", error.message);
    }
})

router.post('/signup', async (req,res)=>{
    try{ 
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
    
    const userId = newUser._id;
    await Account.create({
        userId,
        balance : 100 + Math.random()*10000
    })
    
    const token = jwt.sign({userId : newUser._id}, JWT_SECRET);

    res.json({
        msg : 'user created successfully',
        token : token
    })
    } catch(error){
        console.error('Login failed', error.message);
    }   
})

const signinbody = z.object({
    username : z.string().email(),
    password : z.string()
});

router.post('/signin', async (req, res) => {
    try {
        const {username, password} = req.body;
        const {success} = signinbody.safeParse(req.body);
        if(!success) {
            return res.status(400).json('invalid type of username or password');
        }

        const user = await User.findOne({username, password});
        if(!user) {
            return res.status(400).json('invalid credintials');
        }

        const token = jwt.sign({userId : user._id}, JWT_SECRET);
        return res.json({
            msg : `welcome ${user.firstName}`,
            token : token
        })
    } catch(error) {
        console.error('Sign in failed', error.message);
    }
})


const updateSchema = z.object({
    firstName : z.string().optional(),
    lastName : z.string().optional(),
    password : z.string().optional()
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


// req -> api/v1/user/bulk?filter="xyz";

router.get('/bulk', async (req,res) => {
    const filter = req.query.filter || "";
    const users = await User.find({
        $or : [
            {firstName : {$regex : filter, $options : 'i'}},
            {lastName : {$regex : filter, $options : 'i'}}
        ]
    });
    res.json({
        users : users.map((user) =>{
            return {
                username : user.username,
                firstName : user.firstName,
                lastName : user.lastName,
                _id : user._id
            }
        })
    })
})


module.exports = router;