const domainService = require('../services/domainService');

const getWhitelist = async(req, res) => {
    const token = req.cookies.token;
    try{
        const whitelist = await domainService.getWhitelist(token);
        res.json(whitelist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getBlacklist = async(req, res) => {
    const token = req.cookies.token;
    try{
        const blacklist = await domainService.getBlacklist(token);
        res.json(blacklist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const editDomainName = async(req, res) => {
    const token = req.cookies.token;
    try {
        const { oldDomain, newDomain } = req.body;
        const result = await domainService.editDomainName(oldDomain, newDomain, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const editDomainComment = async(req, res) => {
    const token = req.cookies.token;
    try {
        const { domain, comment } = req.body;
        const result = await domainService.editDomainComment(domain, comment, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addToWhitelist = async(req, res) => {
    const token = req.cookies.token;
    try {
        const { domain, comment } = req.body;
        const result = await domainService.addToWhitelist(domain, comment, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addToBlacklist = async(req, res) => {
    const token = req.cookies.token;
    try {
        const { domain, comment } = req.body;
        const result = await domainService.addToBlacklist(domain, comment, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const removeFromWhitelist = async(req, res) => {
    const token = req.cookies.token;
    try {
        const { domain } = req.body;
        const result = await domainService.removeFromWhitelist(domain, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeFromBlacklist = async(req, res) => {
    const token = req.cookies.token;
    try {
        const { domain } = req.body;
        const result = await domainService.removeFromBlacklist(domain, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addDomainToGroup = async(req, res) => {
    const token = req.cookies.token;
    try {
        const { domain, group } = req.body;
        const result = await domainService.addDomainToGroup(domain, group, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeDomainFromGroup = async(req, res) => {
    const token = req.cookies.token;
    try {
        const { domain, group } = req.body;
        const result = await domainService.removeDomainFromGroup(domain, group, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const enableDomain = async(req, res) => {
    const token = req.cookies.token;
    try {
        const { domain } = req.body;
        const result = await domainService.enableDomain(domain, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const disableDomain = async(req, res) => {
    const token = req.cookies.token;
    try {
        const { domain } = req.body;
        const result = await domainService.disableDomain(domain, token);
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