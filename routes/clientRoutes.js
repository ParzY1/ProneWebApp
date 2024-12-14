const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

router.post('/editClientIp', clientController.editClientIp);
router.post('/editClientComment', clientController.editClientComment);
router.post('/addClient', clientController.addClient);
router.post('/addClientToGroup', clientController.addClientToGroup);
router.post('/removeClientFromGroup', clientController.removeClientFromGroup);
router.post('/removeClient', clientController.removeClient);

router.get('/getClients', clientController.getClients);

module.exports = router;