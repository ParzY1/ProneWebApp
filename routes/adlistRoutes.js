const express = require('express');
const router = express.Router();
const adlistController = require('../controllers/adlistController');

router.post('/addAdlist', adlistController.addAdlist);
router.post('/removeAdlist', adlistController.removeAdlist);
router.post('/editAdlistAddress', adlistController.editAdlistAddress);
router.post('/editAdlistComment', adlistController.editAdlistComment);
router.post('/enableAdlist', adlistController.enableAdlist);
router.post('/disableAdlist', adlistController.disableAdlist);
router.post('/addAdlistToGroup', adlistController.addAdlistToGroup);
router.post('/removeAdlistFromGroup', adlistController.removeAdlistFromGroup);
router.post('/getAdlistGroups', adlistController.getAdlistGroups);

router.get('/getAdlists', adlistController.getAdlists);

module.exports = router;