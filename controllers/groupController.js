const groupService = require('../services/groupService');

const getGroups = async (req, res) => {
    try {
        const groups = await groupService.fetchGroups();
        res.json(groups);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createGroup = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: 'Name and description are required' });
    }

    try {
        const newGroup = await groupService.addGroup(name, description);
        res.json(newGroup);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editGroupName = async (req, res) => {
    const { oldName, newName } = req.body;

    if (!oldName || !newName) {
        return res.status(400).json({ error: 'Both oldName and newName are required' });
    }

    try {
        await groupService.editGroupName(oldName, newName);
        res.json({ message: 'Group name updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const editGroupDescription = async (req, res) => {
    const { name, description } = req.body;

    if (!name || !description) {
        return res.status(400).json({ error: 'Both name and description are required' });
    }

    try {
        await groupService.editGroupDescription(name, description);
        res.json({ message: 'Group description updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const deleteGroup = async (req, res) => {
    const { name } = req.body;

    if (!name) {
        return res.status(400).json({ error: 'Group name is required' });
    }

    try {
        await groupService.deleteGroup(name);
        res.json({ message: 'Group deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const toggleGroupStatus = async (req, res) => {
    const { name } = req.body;
    const enable = req.path.includes('enable');

    if (!name) {
        return res.status(400).json({ error: 'Group name is required' });
    }

    try {
        await groupService.toggleGroupStatus(name, enable);
        res.json({ message: `Group ${enable ? 'enabled' : 'disabled'} successfully` });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getGroups,
    createGroup,
    editGroupName,
    editGroupDescription,
    deleteGroup,
    toggleGroupStatus
};
