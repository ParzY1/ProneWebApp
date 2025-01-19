const axios = require('axios');

const CLIENTS_BASE_URL = 'https://zsmeie-int.prone.pl';

const getClients = async (token) => {
    if (!token) {
        console.error('Token not found');
        throw new Error('Token not found');
    }

    const instance = axios.create({
        baseURL: CLIENTS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    try {
        const response = await instance.get('/clients/getClients');
        console.log('Clients fetched successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching clients:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to fetch clients');
    }
};

const editClientIp = async (oldIp, newIp, token) => {
    if (!token) {
        console.error('Token not found');
        throw new Error('Token not found');
    }

    const instance = axios.create({
        baseURL: CLIENTS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    try {
        const response = await instance.post('/clients/editClientIp', {
            oldIp,
            newIp,
        });
        return response.data;
    } catch (error) {
        console.error('Error editing client IP:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to edit client IP');
    }
};

const editClientComment = async (ip, comment, token) => {
    if (!token) {
        console.error('Token not found');
        throw new Error('Token not found');
    }

    const instance = axios.create({
        baseURL: CLIENTS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    try {
        const response = await instance.post('/clients/editClientComment', {
            ip,
            comment,
        });
        return response.data;
    } catch (error) {
        console.error('Error editing client comment:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to edit client comment');
    }
};

const addClient = async (ip, comment, token) => {
    if (!token) {
        console.error('Token not found');
        throw new Error('Token not found');
    }

    const instance = axios.create({
        baseURL: CLIENTS_BASE_URL,
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
    });

    try {
        const response = await instance.post('/clients/addClient', { ip, comment });
        return response.data;
    } catch (error) {
        console.error('Error adding client:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to add client');
    }
};

const addClientToGroup = async (clientIp, groupName, token) => {
    if (!token) throw new Error('Token not found');

    const instance = axios.create({
        baseURL: CLIENTS_BASE_URL,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });

    try {
        const response = await instance.post('/clients/addClientToGroup', { ip: clientIp, group: groupName });
        return response.data;
    } catch (error) {
        console.error('Error adding client to group:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to add client to group');
    }
};

const removeClientFromGroup = async (clientIp, groupName, token) => {
    if (!token) throw new Error('Token not found');

    const instance = axios.create({
        baseURL: CLIENTS_BASE_URL,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
    });

    try {
        const response = await instance.post('/clients/removeClientFromGroup', { ip: clientIp, group: groupName });
        return response.data;
    } catch (error) {
        console.error('Error removing client from group:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to remove client from group');
    }
};

const removeClient = async (clientIp, token) => {
    if (!token) throw new Error('Token not found');

    const instance = axios.create({
        baseURL: CLIENTS_BASE_URL,
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }
    });

    try{
        const response = await instance.post('/clients/removeClient', { ip: clientIp });
        return response.data;
    } catch (error){
        console.error('Error removing client:', error.response?.data || error.message);
        throw new Error(error.response?.data?.message || 'Failed to remove client');
    }
}

module.exports = { getClients, editClientIp, editClientComment, addClient, addClientToGroup, removeClientFromGroup, removeClient };