const axios = require('axios');
const { getStoredToken } = require('../middlewares/auth');

const ADLISTS_BASE_URL = 'https://zsmeie-int.prone.pl';

const getAdlists = async () => {
    const token = getStoredToken();

    if(!token){
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: ADLISTS_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        const response = await instance.get('/adlists/getAdlists');
        console.log('Adlists fetched successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching adlists:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch adlists');
    }
};

const addAdlist = async (address, comment) => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: ADLISTS_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        const response = await instance.post('/adlists/addAdlist', {
            address,
            comment
        });
        console.log('Adlist added successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding adlist:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to add adlist');
    }
};

const deleteAdlist = async (address) => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: ADLISTS_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        const response = await instance.post(`/adlists/removeAdlist`, {
            address
        });
        console.log('Adlist deleted successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting adlist:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to delete adlist');
    }
};

const editAdlistAddress = async (oldAddress, newAddress) => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: ADLISTS_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        const response = await instance.post(`/adlists/editAdlistAddress`, {
            oldAddress,
            newAddress
        });
        console.log('Adlist address updated successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating adlist address:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to update adlist address');
    }
};

const editAdlistComment = async (address, comment) => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: ADLISTS_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        const response = await instance.post(`/adlists/editAdlistComment`, {
            address,
            comment
        });
        console.log('Adlist comment updated successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error updating adlist comment:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to update adlist comment');
    }
};

const enableAdlist = async(address) => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: ADLISTS_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        const response = await instance.post('/adlists/enableAdlist', {
            address
        });
        console.log('Adlist enabled successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error enabling adlist:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to enable adlist');
    }
};

const disableAdlist = async (address) => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: ADLISTS_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        const response = await instance.post('/adlists/disableAdlist', {
            address
        });
        console.log('Adlist disabled successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error disabling adlist:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to disable adlist');
    }
};

const addAdlistToGroup = async (address, group) => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: ADLISTS_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        const response = await instance.post('/adlists/addAdlistToGroup', {
            address,
            group
        });
        console.log('Adlist added to group successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding adlist to group:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to add adlist to group');
    }
};

const removeAdlistFromGroup = async (address, group) => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: ADLISTS_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        const response = await instance.post('/adlists/removeAdlistFromGroup', {
            address,
            group
        });
        console.log('Adlist removed from group successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error removing adlist from group:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to remove adlist from group');
    }
};

const getAdlistGroups = async (address) => {
    const token = getStoredToken();

    if(!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: ADLISTS_BASE_URL,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });

    try {
        const response = await instance.post('/adlists/getAdlistGroups', {
            address
        });
        console.log('Adlist groups retrieved successfully: ', response.data);
        return response.data;
    } catch (error) {
        console.error('Error retrieving adlist groups:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to retrieve adlist groups');
    }
};

module.exports = {
    getAdlists,
    addAdlist,
    deleteAdlist,
    editAdlistAddress,
    editAdlistComment,
    enableAdlist,
    disableAdlist,
    addAdlistToGroup,
    removeAdlistFromGroup,
    getAdlistGroups
};