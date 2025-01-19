const queryService = require('../services/queryService');

const getQueries = async(req, res) => {
    const token = req.cookies.token;
    try {
        const queries = await queryService.fetchAllQueries(token);
        res.json(queries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getQueriesLast24Hours = async(req, res) => {
    const token = req.cookies.token;
    try {
        const queries = await queryService.fetchQueriesLast24Hours(token);
        res.json(queries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getQueries, getQueriesLast24Hours };