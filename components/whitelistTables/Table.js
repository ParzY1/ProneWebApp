import WhitelistTableRow from "./TableRow.js";

const WhitelistTable = {
    render: (domains, allGroups) => {
        return `<h2>Domeny Dozwolone</h2>
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
                    <tbody class="whitelist-table">
                        ${domains.length > 0
                            ? domains.map(domain => WhitelistTableRow.render(domain, allGroups)).join('')
                            : `<tr><td colspan="5">Brak klientów do wyświetlenia</td></tr>`
                        }
                    </tbody>
                </table>`;
    },

    fetchWhitelist: async () => {
        const response = await fetch('/domains/getWhitelist', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if(!response.ok) throw new Error('Failed to fetch whitelist');
        const json = await response.json();
        return json.data;
    },

    fetchGroups: async () => {
        const response = await fetch('/groups/getGroups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok) throw new Error('Failed to fetch groups');
        const json = await response.json();
        return json.data;
    }
};

export default WhitelistTable;