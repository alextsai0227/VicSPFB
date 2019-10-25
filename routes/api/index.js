const express = require('express');
const router = express.Router();

router.use('/supplier', require('./supplier'));
router.use('/verifier', require('./verifier'));
router.use('/gov', require('./gov'));

module.exports = router;