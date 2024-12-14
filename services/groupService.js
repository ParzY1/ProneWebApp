// groupService.js
const axios = require('axios');
const { getStoredToken } = require('../middlewares/auth'); // Import function to get stored token

const fetchGroups = async () => {
    const token = getStoredToken();  // Get the token from memory

    if (!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    console.log('Attempting to fetch groups with token:', token);

    const instance = axios.create({
        baseURL: 'https://zsmeie-int.prone.pl',
        headers: {
            Authorization: `Bearer ${token}`,  // Pass the token directly
        },
    });

    try {
        const response = await instance.get('/groups/getGroups');
        console.log('Groups fetched successfully:', response.data); // Log successful response
        return response.data;
    } catch (error) {
        console.error('Error fetching groups:', error.response?.data || error.message);
        throw new Error('Failed to fetch groups');
    }
};

const addGroup = async (name, description) => {
    const token = getStoredToken(); // Retrieve stored token

    if (!token) {
        console.error('Token not found');
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: 'https://zsmeie-int.prone.pl',
        headers: {
            Authorization: `Bearer ${token}`, // Pass the token
        },
    });

    try {
        const response = await instance.post('/groups/addGroup', { name, description });
        console.log('Group added successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding group:', error.response?.data || error.message);
        throw new Error('Failed to add group');
    }
};

const editGroupName = async (oldName, newName) => {
    const token = getStoredToken();

    if (!token) {
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: 'https://zsmeie-int.prone.pl',
        headers: {
            Authorization: `Bearer ${token}`, // Pass the token
        },
    });

    try{
        const response = await instance.post('/groups/editGroupName', { oldName, newName });
        console.log("Group edited successfully!: ", response.data);
        return response.data;
    } catch (error){
        console.error('Error editing group name:', error.response?.data || error.message);
        throw new Error('Failed to edit group name');
    }
};

const editGroupDescription = async (name, description) => {
    const token = getStoredToken();

    if (!token) {
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: 'https://zsmeie-int.prone.pl',
        headers: {
            Authorization: `Bearer ${token}`, // Pass the token
        },
    });

    try{
        const response = await instance.post('/groups/editGroupDescription', { name, description });
        console.log("Group description edited successfully!: ", response.data);
        return response.data;
    } catch (error){
        console.error('Error editing group description:', error.response?.data || error.message);
        throw new Error('Failed to edit group description');
    }
};

const deleteGroup = async (name) => {
    const token = getStoredToken();

    if (!token) {
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: 'https://zsmeie-int.prone.pl',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    try {
        const response = await instance.post('/groups/deleteGroup', { name });
        console.log('Group deleted successfully:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error deleting group:', error.response?.data || error.message);
        throw new Error('Failed to delete group');
    }
};

const toggleGroupStatus = async (name, enable) => {
    const token = getStoredToken();

    if (!token) {
        throw new Error('No token found');
    }

    const instance = axios.create({
        baseURL: 'https://zsmeie-int.prone.pl',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    try {
        const url = `/groups/${enable ? 'enableGroup' : 'disableGroup'}`;
        const response = await instance.post(url, { name });
        console.log(`${enable ? 'Enabled' : 'Disabled'} group successfully:`, response.data);
        return response.data;
    } catch (error) {
        console.error(`Error ${enable ? 'enabling' : 'disabling'} group:`, error.response?.data || error.message);
        throw new Error(`Failed to ${enable ? 'enable' : 'disable'} group`);
    }
};

module.exports = { fetchGroups, addGroup, editGroupName, editGroupDescription, deleteGroup, toggleGroupStatus };