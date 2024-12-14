const domainService = require('../services/domainService');

const getWhitelist = async(req, res) => {
    try{
        const whitelist = await domainService.getWhitelist();
        res.json(whitelist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBlacklist = async(req, res) => {
    try{
        const blacklist = await domainService.getBlacklist();
        res.json(blacklist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const editDomainName = async(req, res) => {
    try {
        const { oldDomain, newDomain } = req.body;
        const result = await domainService.editDomainName(oldDomain, newDomain);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const editDomainComment = async(req, res) => {
    try {
        const { domain, comment } = req.body;
        const result = await domainService.editDomainComment(domain, comment);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addToWhitelist = async(req, res) => {
    try {
        const { domain, comment } = req.body;
        const result = await domainService.addToWhitelist(domain, comment);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addToBlacklist = async(req, res) => {
    try {
        const { domain, comment } = req.body;
        const result = await domainService.addToBlacklist(domain, comment);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const removeFromWhitelist = async(req, res) => {
    try {
        const { domain } = req.body;
        const result = await domainService.removeFromWhitelist(domain);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFromBlacklist = async(req, res) => {
    try {
        const { domain } = req.body;
        const result = await domainService.removeFromBlacklist(domain);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addDomainToGroup = async(req, res) => {
    try {
        const { domain, group } = req.body;
        const result = await domainService.addDomainToGroup(domain, group);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeDomainFromGroup = async(req, res) => {
    try {
        const { domain, group } = req.body;
        const result = await domainService.removeDomainFromGroup(domain, group);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const enableDomain = async(req, res) => {
    try {
        const { domain } = req.body;
        const result = await domainService.enableDomain(domain);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const disableDomain = async(req, res) => {
    try {
        const { domain } = req.body;
        const result = await domainService.disableDomain(domain);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getWhitelist, 
    getBlacklist, 
    editDomainName, 
    editDomainComment, 
    addToWhitelist, 
    addToBlacklist, 
    removeFromWhitelist, 
    removeFromBlacklist,
    addDomainToGroup,
    removeDomainFromGroup,
    enableDomain,
    disableDomain
};