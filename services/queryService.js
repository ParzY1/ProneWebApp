const axios = require('axios');

const QUERIES_BASE_URL = 'https://zsmeie-int.prone.pl';
 
const fetchAllQueries = async(token) => {
    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: QUERIES_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try{
        const response = await instance.get('/pi-hole/queries');
        return response.data;
    } catch (error) {
        console.error('Error fetching queries: ', error.response?.data || error.message);
        throw new Error('Failed to fetch queries');
    }
};

const fetchQueriesLast24Hours = async (token) => {
    try {
        if (!token) {
            console.error('Token not found in fetchQueriesLast24Hours');
            throw new Error('No token found');
        }

        const instance = axios.create({
            baseURL: QUERIES_BASE_URL,
            headers: { 'Authorization': `Bearer ${token}` }
        });

        const response = await instance.get('/pi-hole/queries-last-24-hours');
        console.log('Fetched queries successfully:', response.data);
        return response.data;

    } catch (error) {
        console.error('Error in fetchQueriesLast24Hours:', error.response?.data || error.message);
        throw new Error('Failed to fetch queries');
    }
};

module.exports = { fetchAllQueries, fetchQueriesLast24Hours };