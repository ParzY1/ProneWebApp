import WhitelistTableColumn from "./TableColumn.js";

const WhitelistTableRow = {
    render: (domain, allGroups) => {
        const assignedGroups = Array.isArray(domain.groups) ? domain.groups : [];
        return `
            <tr>
                ${WhitelistTableColumn.text(domain.domain)}
                ${WhitelistTableColumn.text(domain.comment)}
                ${WhitelistTableColumn.checkbox({domainName: domain.domain, isChecked: domain.enabled})}
                ${WhitelistTableColumn.dropdown(assignedGroups, allGroups)}
                ${WhitelistTableColumn.actions(domain.domain)}
            </tr>`;
    },
    deleteFromWhitelist: async (domain) => {
        const response = await fetch('/domains/removeFromWhitelist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ domain })
        });
        if (!response.ok) throw new Error('Failed to remove from whitelist');
        return response.json();
    },
    editDomainName: async (oldDomain, newDomain) => {
        const response = await fetch('/domains/editDomainName', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({oldDomain: oldDomain, newDomain: newDomain})
        });
        if (!response.ok) throw new Error('Failed to edit domain name');
        return response.json();
    },
    editDomainComment: async (domain, comment) => {
        const response = await fetch('/domains/editDomainComment', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({domain: domain, comment: comment})
        });
        if (!response.ok) throw new Error('Failed to edit domain comment');
        return response.json();
    },
    enableDomain: async (domain) => {
        const response = await fetch('/domains/enableDomain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({domain: domain})
        });
        if (!response.ok) throw new Error('Failed to enable domain');
        return response.json();
    },
    disableDomain: async (domain) => {
        const response = await fetch('/domains/disableDomain', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({domain: domain})
        });
        if (!response.ok) throw new Error('Failed to disable domain');
        return response.json();
    },
    addDomainToGroup: async (domain, group) => {
        const response = await fetch('/domains/addDomainToGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({domain: domain, group: group})
        });
        if (!response.ok) throw new Error('Failed to add domain to group');
        return response.json();
    },
    removeDomainFromGroup: async (domain, group) => {
        const response = await fetch('/domains/removeDomainFromGroup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({domain: domain, group: group})
        });
        if (!response.ok) throw new Error('Failed to remove domain from group');
        return response.json();
    }
};

export default WhitelistTableRow;