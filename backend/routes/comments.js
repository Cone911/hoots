const express = require('express');
const router = express.Router();
const commentsCtrl = require('../controllers/comments');

// All paths start with /api

router.post('/hoots/:hootId/comments', commentsCtrl.create);

module.exports = router;