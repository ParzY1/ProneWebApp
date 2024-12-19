const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

router.get('/summary', dashboardController.getSummary);
router.get('/top-clients', dashboardController.getTopClients);
router.get('/top-domains', dashboardController.getTopDomains);

module.exports = router;