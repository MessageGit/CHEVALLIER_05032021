const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const replyCtrl = require('../controllers/reply');

router.get('/:id', replyCtrl.getAllReplies);
router.post('/:id', auth, replyCtrl.createReply);
router.put('/:id', auth, replyCtrl.editReply);
router.delete('/:id', auth, replyCtrl.deleteReply);

module.exports = router;