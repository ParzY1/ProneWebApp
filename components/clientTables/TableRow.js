import TableColumn from "./TableColumn.js";

const TableRow = {
    render: (client, allGroups) => {
        const assignedGroups = client.groups.split(',').map(group => group.trim());

        return `
            <tr>
                ${TableColumn.text(client.ip)}
                ${TableColumn.text(client.comment || 'Brak')}
                ${TableColumn.dropdown(assignedGroups, allGroups)}
                ${TableColumn.actions(client.ip)}
            </tr>`;
    },
    deleteClient: async (client_ip) => {
        const response = await fetch('/clients/removeClient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({client_ip: client_ip})
        });
        if(!response.ok) throw new Error('Failed to remove client');
        return response.json();
    },
    editClientIp: async (oldIp, newIp) => {
        const response = await fetch('/clients/editClientIp', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({oldIp: oldIp, newIp: newIp})
        });
        if(!response.ok) throw new Error('Failed to edit client IP');
        return response.json();
    },
    editClientComment: async (ip, comment) => {
        const response = await fetch('/clients/editClientComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ip: ip, comment: comment})
        });
    },
    addClientToGroup: async (client_ip, group_name) => {
        const response = await fetch('/clients/addClientToGroup', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({client_ip: client_ip, group_name: group_name})
        });
        if(!response.ok) throw new Error('Failed to add client to group');
        return response.json();
    },
    removeClientFromGroup: async (client_ip, group_name) => {
        const response = await fetch('/clients/removeClientFromGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({client_ip: client_ip, group_name: group_name})
        });
        if(!response.ok) throw new Error('Failed to remove client from group');
        return response.json();
    }
};

export default TableRow;