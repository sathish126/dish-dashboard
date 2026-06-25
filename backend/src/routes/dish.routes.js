const express = require('express');
const router = express.Router();
const { getDishes, togglePublishStatus } = require('../controllers/dish.controller');

router.get('/', getDishes);
router.patch('/:id/toggle', togglePublishStatus);

module.exports = router;
