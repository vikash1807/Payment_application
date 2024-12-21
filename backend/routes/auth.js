const express = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = express.Router();

router.get('/verify', authMiddleware, (req,res) => {
    res.json({userId : req.userId});
})

module.exports = router;