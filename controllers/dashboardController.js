const dashboardService = require('../services/dashboardService');

const getSummary = async(req, res) => {
    const token = req.cookies.token;
    try {
        const summary = await dashboardService.fetchSummary(token);
        res.json(summary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTopClients = async (req, res) => {
    const token = req.cookies.token;
    try {
        const topClients = await dashboardService.fetchTopClients(token);
        res.json(topClients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTopDomains = async (req, res) => {
    const token = req.cookies.token;
    try {
        const topDomains = await dashboardService.fetchTopDomains(token);
        res.json(topDomains);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getSummary,
    getTopClients,
    getTopDomains
};