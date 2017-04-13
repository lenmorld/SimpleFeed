var router = require('express').Router();

router.use(require('./posts'));                // so that angular posts.js would be loaded

module.exports = router;