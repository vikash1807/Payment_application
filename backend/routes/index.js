const express = require('express')
const router = express.Router();
const userRouter = require('./user')

router.use('/user', userRouter); // can't use app.use() here,

// router.get('/', (req,res) => {
//     res.json('/api/v1/ router has been hit');
// })
module.exports = router;

