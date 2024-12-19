const axios = require('axios');
const { getStoredToken } = require('../middlewares/auth');

const DASHBOARD_BASE_URL = 'https://zsmeie-int.prone.pl/';

const fetchSummary = async() => {
    const token = getStoredToken();

    if(!token){
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DASHBOARD_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try{
        const response = await instance.get('/pi-hole/summary-statistics');
        console.log('Summary stats fetched successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching summary stats:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch clients');
    }
};

const fetchTopClients = async() => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DASHBOARD_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });

    try{
        const response = await instance.get('/pi-hole/top-clients');
        console.log('Top clients fetched successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching top clients:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch top clients');
    }
};

const fetchTopDomains = async() => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DASHBOARD_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try {
        const response = await instance.get('/pi-hole/top-items');
        console.log('Top domains fetched successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching top domains:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch top domains');
    }
};

module.exports = { 
    fetchSummary,
    fetchTopClients,
    fetchTopDomains
};