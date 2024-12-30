import TableRow from "./TableRow.js";

const Table = {
    render: (clients, allGroups) => {
        return `
            <table class="clients-table">
                <thead>
                    <tr>
                        <th>IP</th>
                        <th>Komentarz</th>
                        <th>Grupy</th>
                        <th>Akcje</th>
                    </tr>
                </thead>
                <tbody>
                    ${clients.length > 0
                        ? clients.map(client => TableRow.render(client, allGroups)).join('')
                        : `<tr><td colspan="4">Brak klientów do wyświetlenia</td></tr>`
                    }
                </tbody>
            </table>`;
    },

    fetchClients: async () => {
        const response = await fetch('/clients/getClients');
        if (!response.ok) throw new Error('Failed to load clients');
        return response.json();
    },

    fetchGroups: async () => {
        const response = await fetch('/groups/getGroups');
        if (!response.ok) throw new Error('Failed to load groups');
        const data = await response.json();
        return data.data.map(group => group.name);
    }
};

export default Table;