const clientService = require('../services/clientService');

const getClients = async (req, res)=>{
    const token = req.cookies.token;
    try {
        const clients = await clientService.getClients(token);
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editClientIp = async (req, res) => {
    const token = req.cookies.token;
    const { oldIp, newIp } = req.body;
    try {
        const result = await clientService.editClientIp(oldIp, newIp, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editClientComment = async (req, res) => {
    const token = req.cookies.token;
    const { ip, comment } = req.body;
    try {
        const result = await clientService.editClientComment(ip, comment, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addClient = async(req, res) => {
    const token = req.cookies.token;
    const { ip, comment } = req.body;
    try{
        const result = await clientService.addClient(ip, comment, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addClientToGroup = async (req, res) => {
    const token = req.cookies.token;
    const { client_ip, group_name } = req.body;
    try {
        const result = await clientService.addClientToGroup(client_ip, group_name, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeClientFromGroup = async (req, res) => {
    const token = req.cookies.token;
    const { client_ip, group_name } = req.body;
    try {
        const result = await clientService.removeClientFromGroup(client_ip, group_name, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeClient = async (req, res) => {
    const token = req.cookies.token;
    const { client_ip } = req.body;
    try{
        const result = await clientService.removeClient(client_ip, token);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { 
    getClients,
    editClientIp,
    editClientComment,
    addClient,
    addClientToGroup,
    removeClientFromGroup,
    removeClient
};