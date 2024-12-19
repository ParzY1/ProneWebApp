const express = require('express');
const router = express.Router();
const queryController = require('../controllers/queryController');

router.get('/queries', queryController.getQueries);
router.get('/queries-last-24-hours', queryController.getQueriesLast24Hours);

module.exports = router;