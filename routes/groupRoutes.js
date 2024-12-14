const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

router.post('/addGroup', groupController.createGroup);
router.post('/deleteGroup', groupController.deleteGroup);
router.post('/enableGroup', groupController.toggleGroupStatus);
router.post('/disableGroup', groupController.toggleGroupStatus);
router.post('/editGroupName', groupController.editGroupName);
router.post('/editGroupDescription', groupController.editGroupDescription);

router.get('/getGroups', groupController.getGroups);

module.exports = router;