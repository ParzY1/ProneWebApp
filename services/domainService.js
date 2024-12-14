const axios = require('axios');
const { getStoredToken } = require('../middlewares/auth');

const DOMAINS_BASE_URL = 'https://zsmeie-int.prone.pl/';

const getWhitelist = async () => {
    const token = getStoredToken();

    if(!token){
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DOMAINS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try{
        const response = await instance.get('/domains/getWhitelist');
        console.log('Whitelist fetched successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching whitelist: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch clients');
    }
};

const getBlacklist = async () => {
    const token = getStoredToken();

    if(!token){
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DOMAINS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try{
        const response = await instance.get('/domains/getBlacklist');
        console.log('Blacklist fetched successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching blacklist: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch clients');
    }
};

const editDomainName = async (oldDomain, newDomain) => {
    const token = getStoredToken();

    if(!token){
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DOMAINS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try{
        const response = await instance.post('/domains/editDomainName', {
            oldDomain,
            newDomain
        });
        return response.data;
    } catch (error) {
        console.error('Error editing domain name: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to edit domain name');
    }
}

const editDomainComment = async(domain, comment) => {
    const token = getStoredToken();
    if(!token){
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DOMAINS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try{
        const response = await instance.post('/domains/editDomainComment', {
            domain,
            comment
        });
        return response.data;
    } catch (error) {
        console.error('Error editing domain comment: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to edit domain comment');
    }
};

const addToWhitelist = async(domain, comment) => {
    const token = getStoredToken();

    if(!token){
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DOMAINS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try{
        const response = await instance.post('/domains/addToWhitelist', {
            domain,
            comment
        });
        return response.data;
    } catch (error) {
        console.error('Error adding domain to whitelist: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to add domain to whitelist');
    }
};

const addToBlacklist = async(domain, comment) => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DOMAINS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try{
        const response = await instance.post('/domains/addToBlacklist', {
            domain,
            comment
        });
        return response.data;
    } catch (error) {
        console.error('Error adding domain to blacklist: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to add domain to blacklist');
    }
}

const removeFromWhitelist = async(domain) => {
    const token = getStoredToken();

    if(!token){
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DOMAINS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try{
        const response = await instance.post('/domains/removeFromWhitelist', {
            domain
        });
        return response.data;
    } catch (error) {
        console.error('Error removing domain from whitelist: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to remove domain from whitelist');
    }
};

const removeFromBlacklist = async(domain) => {
    const token = getStoredToken();

    if(!token){
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DOMAINS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try{
        const response = await instance.post('/domains/removeFromBlacklist', {
            domain
        });
        return response.data;
    } catch (error) {
        console.error('Error removing domain from blacklist: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to remove domain from blacklist');
    }
};

const addDomainToGroup = async(domain, group) => {
    const token = getStoredToken();

    if(!token){
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DOMAINS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try{
        const response = await instance.post('/domains/addDomainToGroup', {
            domain,
            group
        });
        return response.data;
    } catch (error) {
        console.error('Error adding domain to group: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to add domain to group');
    }
};

const removeDomainFromGroup = async(domain, group) => {
    const token = getStoredToken();

    if(!token){
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DOMAINS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try{
        const response = await instance.post('/domains/removeDomainFromGroup', {
            domain,
            group
        });
        return response.data;
    } catch (error) {
        console.error('Error removing domain from group: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to remove domain from group');
    }
};

const enableDomain = async(domain) => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DOMAINS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try{
        const response = await instance.post('/domains/enableDomain', {
            domain
        });
        return response.data;
    } catch (error) {
        console.error('Error enabling domain: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to enable domain');
    }
};

const disableDomain = async(domain) => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: DOMAINS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    try{
        const response = await instance.post('/domains/disableDomain', {
            domain
        });
        return response.data;
    } catch (error) {
        console.error('Error disabling domain: ', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to disable domain');
    }
}

module.exports = { 
    getWhitelist,
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