import TableColumn from "./TableColumn.js";
import Table from "./Table.js";

const TableRow = {
    render: async (adlist, allGroups) => {
        const assignedGroupsData = await Table.getAdlistGroups(adlist.address);
        const assignedGroups = assignedGroupsData.map((group) => group.group_id);
        return `
            <tr>
                ${TableColumn.address(adlist.address)}
                ${TableColumn.text(adlist.comment)}
                ${TableColumn.checkbox({adlistAddress: adlist.address, isChecked: adlist.enabled})}
                ${TableColumn.dropdown(assignedGroups, allGroups)}
                ${TableColumn.actions(adlist.address)}
            </tr>`;
    },
    deleteAdlist: async (address) => {
        const response = await fetch('/adlists/removeAdlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({address})
        });
        if (!response.ok) throw new Error('Failed to remove from adlist');
        return response.json();
    },
    editAdlistAddress: async (oldAddress, newAddress) => {
        const response = await fetch('/adlists/editAdlistAddress', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({oldAddress, newAddress})
        });
        if (!response.ok) throw new Error('Failed to edit adlist address');
        return response.json();
    },
    editAdlistComment: async (address, comment) => {
        const response = await fetch('/adlists/editAdlistComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({address, comment})
        });
        if (!response.ok) throw new Error('Failed to edit adlist comment');
        return response.json();
    },
    enableAdlist: async (address) => {
        const response = await fetch('/adlists/enableAdlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({address})
        });
        if (!response.ok) throw new Error('Failed to enable adlist');
        return response.json();
    },
    disableAdlist: async (address) => {
        const response = await fetch('/adlists/disableAdlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({address})
        });
        if (!response.ok) throw new Error('Failed to disable adlist');
        return response.json();
    },
    addAdlistToGroup: async (address, group) => {
        const response = await fetch('/adlists/addAdlistToGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({address, group})
        });
        if (!response.ok) throw new Error('Failed to add adlist to group');
        return response.json();
    },
    removeAdlistFromGroup: async (address, group) => {
        const response = await fetch('/adlists/removeAdlistFromGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({address, group})
        });
        if (!response.ok) throw new Error('Failed to remove adlist from group');
        return response.json();
    }
}

export default TableRow;