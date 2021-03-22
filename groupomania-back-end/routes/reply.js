const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const replyCtrl = require('../controllers/reply');

router.post('/:id', auth, replyCtrl.createReply);

module.exports = router;