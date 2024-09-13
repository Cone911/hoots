const express = require('express');
const router = express.Router();
const hootsCtrl = require('../controllers/hoots')

// All paths start with api/hoots

router.get('/', hootsCtrl.index);
router.get('/:hootId', hootsCtrl.show);

module.exports = router;