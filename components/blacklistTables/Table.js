import BlacklistTableRow from "./TableRow.js";

const BlacklistTable = {
    render: (domains, allGroups) => {
        return `<h2>Domeny Zablokowane</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Domena</th>
                            <th>Komentarz</th>
                            <th>Status</th>
                            <th>Grupy</th>
                            <th>Akcje</th>
                        </tr>
                    </thead>
                    <tbody class="blacklist-table">
                        ${domains.length > 0
                            ? domains.map(domain => BlacklistTableRow.render(domain, allGroups)).join('')
                            : `<tr><td colspan="5">Brak domen do wyświetlenia</td></tr>`
                        }
                    </tbody>
                </table>`;
    },

    fetchBlacklist: async () => {
        const response = await fetch('/domains/getBlacklist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Failed to fetch blacklist');
        const json = await response.json();
        return json.data;
    },

    fetchGroups: async () => {
        const response = await fetch('/groups/getGroups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) throw new Error('Failed to fetch groups');
        const json = await response.json();
        return json.data;
    }
};

export default BlacklistTable;