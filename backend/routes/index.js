const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const accountRouter = require('./account');
const authRouter = require('./auth');

router.use('/user', userRouter); // can't use app.use() here,
router.use('/account', accountRouter);
router.use('/auth', authRouter);

// router.get('/', (req,res) => {
//     res.json('/api/v1/ router has been hit');
// })

module.exports = router;

