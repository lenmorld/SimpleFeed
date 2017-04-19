var router = require('express').Router();

router.use(require('./posts'));                // so that angular posts.js would be loaded
router.use(require('./sessions'));
router.use(require('./users'));


module.exports = router;