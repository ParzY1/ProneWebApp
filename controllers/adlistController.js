const adlistService = require('../services/adlistService');

const getAdlists = async (req, res) => {
    try {
        const adlists = await adlistService.getAdlists();
        res.json(adlists);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching adlists' });
    }
};

const addAdlist = async (req, res) => {
    const { address, comment } = req.body;
    try {
        const adlist = await adlistService.addAdlist(address, comment);
        res.json(adlist);
    } catch (error) {
        res.status(500).json({ message: 'Error adding adlist' });
    }
};

const removeAdlist = async (req, res) => {
    const { address } = req.body;
    try {
        await adlistService.deleteAdlist(address);
        res.json({ message: 'Adlist removed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing adlist' });
    }
};

const editAdlistAddress = async (req, res) => {
    const { oldAddress, newAddress } = req.body;
    try {
        await adlistService.editAdlistAddress(oldAddress, newAddress);
        res.json({ message: 'Adlist address updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating adlist address' });
    }
};

const editAdlistComment = async (req, res) => {
    const { address, comment } = req.body;
    try {
        await adlistService.editAdlistComment(address, comment);
        res.json({ message: 'Adlist comment updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error updating adlist comment' });
    }
};

const enableAdlist = async (req, res) => {
    const { address } = req.body;
    try {
        await adlistService.enableAdlist(address);
        res.json({ message: 'Adlist enabled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error enabling adlist' });
    }
};

const disableAdlist = async (req, res) => {
    const { address } = req.body;
    try {
        await adlistService.disableAdlist(address);
        res.json({ message: 'Adlist disabled successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error disabling adlist' });
    }
};

const addAdlistToGroup = async (req, res) => {
    const { address, group } = req.body;
    try {
        await adlistService.addAdlistToGroup(address, group);
        res.json({ message: 'Adlist added to group successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error adding adlist to group' });
    }
};

const removeAdlistFromGroup = async (req, res) => {
    const { address, group } = req.body;
    try {
        await adlistService.removeAdlistFromGroup(address, group);
        res.json({ message: 'Adlist removed from group successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing adlist from group' });
    }
};

const getAdlistGroups = async (req, res) => {
    const { address } = req.body;
    try {
        const groups = await adlistService.getAdlistGroups(address);
        res.json(groups);
    } catch (error) {
        res.status(500).json({ message: 'Error getting adlist groups' });
    }
};

module.exports = {
    getAdlists,
    addAdlist,
    removeAdlist,
    editAdlistAddress,
    editAdlistComment,
    enableAdlist,
    disableAdlist,
    addAdlistToGroup,
    removeAdlistFromGroup,
    getAdlistGroups
};