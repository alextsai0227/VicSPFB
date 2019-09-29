const express = require('express');
const router = express.Router();

router.use('/supplier', require('./supplier'));
router.use('/verifier', require('./verifier'));

module.exports = router;