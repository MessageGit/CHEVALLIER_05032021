const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPosts);
router.post('/', auth, multer, postCtrl.createPost);
router.delete('/:id', auth, postCtrl.deletePost);
router.put('/:id', auth, postCtrl.editPost);

module.exports = router;

// Updated (21/03/2021)