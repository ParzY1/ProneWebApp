const dashboardService = require('../services/dashboardService');

const getSummary = async(req, res) => {
    try {
        const summary = await dashboardService.fetchSummary();
        res.json(summary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTopClients = async (req, res) => {
    try {
        const topClients = await dashboardService.fetchTopClients();
        res.json(topClients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getTopDomains = async (req, res) => {
    try {
        const topDomains = await dashboardService.fetchTopDomains();
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