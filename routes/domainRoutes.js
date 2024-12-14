const express = require('express');
const router = express.Router();
const domainController = require('../controllers/domainController');

router.post('/editDomainName', domainController.editDomainName);
router.post('/editDomainComment', domainController.editDomainComment);
router.post('/addToWhitelist', domainController.addToWhitelist);
router.post('/addToBlacklist', domainController.addToBlacklist);
router.post('/removeFromWhitelist', domainController.removeFromWhitelist);
router.post('/removeFromBlacklist', domainController.removeFromBlacklist);
router.post('/addDomainToGroup', domainController.addDomainToGroup);
router.post('/removeDomainFromGroup', domainController.removeDomainFromGroup);
router.post('/enableDomain', domainController.enableDomain);
router.post('/disableDomain', domainController.disableDomain);

router.get('/getWhitelist', domainController.getWhitelist);
router.get('/getBlacklist', domainController.getBlacklist);

module.exports = router;