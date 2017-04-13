// index.js is like the entry point for requiring a module

var router = require('express').Router();

router.use('/api', require('./api'));           // use whole folder
router.use('/', require('./static'));

module.exports = router;