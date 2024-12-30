import TableColumn from "./TableColumn.js";

const TableRow = {
    render: (group) => {
        return `
            <tr>
                ${TableColumn.text(group.name, 'group-name')}
                ${TableColumn.text(group.description, 'group-description')}
                ${TableColumn.checkbox({ groupName: group.name, isChecked: group.enabled ? 'checked': '' }, 'group-status')}
                ${TableColumn.actions({ groupName: group.name }, 'group-actions')}
            </tr>
        `;
    },

    toggleGroupStatus: async (groupName, isEnabled) => {
        const url = `/groups/${isEnabled ? 'enableGroup' : 'disableGroup'}`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: groupName }),
        });
        if (!response.ok) throw new Error(`Failed to ${isEnabled ? 'enable' : 'disable'} group.`);
        return response.json();
    },

    deleteGroup: async (groupName) => {
        const response = await fetch(`/groups/deleteGroup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: groupName })
        });
        if (!response.ok) throw new Error('Failed to delete grouo');
        return response.json();
    },

    editGroupName: async (oldName, newName) => {
        const response = await fetch('/groups/editGroupName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ oldName: oldName, newName: newName })
        });
        if (!response.ok) throw new Error('Failed to edit group name');
        return response.json();
    },

    editGroupDescription: async (name, description) => {
        const response = await fetch('/groups/editGroupDescription', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, description: description })
        });
        if (!response.ok) throw new Error('Failed to edit group description');
        return response.json();
    }
};

export default TableRow;