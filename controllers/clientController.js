const clientService = require('../services/clientService');

const getClients = async (req, res)=>{
    try {
        const clients = await clientService.getClients();
        res.json(clients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editClientIp = async (req, res) => {
    const { oldIp, newIp } = req.body;
    try {
        const result = await clientService.editClientIp(oldIp, newIp);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editClientComment = async (req, res) => {
    const { ip, comment } = req.body;
    try {
        const result = await clientService.editClientComment(ip, comment);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const addClient = async(req, res) => {
    const { ip, comment } = req.body;
    try{
        const result = await clientService.addClient(ip, comment);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const addClientToGroup = async (req, res) => {
    const { client_ip, group_name } = req.body;
    try {
        const result = await clientService.addClientToGroup(client_ip, group_name);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeClientFromGroup = async (req, res) => {
    const { client_ip, group_name } = req.body;
    try {
        const result = await clientService.removeClientFromGroup(client_ip, group_name);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const removeClient = async (req, res) => {
    const { client_ip } = req.body;
    try{
        const result = await clientService.removeClient(client_ip);
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