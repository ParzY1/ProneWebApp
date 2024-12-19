const queryService = require('../services/queryService');

const getQueries = async(req, res) => {
    try {
        const queries = await queryService.fetchAllQueries();
        res.json(queries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getQueriesLast24Hours = async(req, res) => {
    try {
        const queries = await queryService.fetchQueriesLast24Hours();
        res.json(queries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getQueries, getQueriesLast24Hours };