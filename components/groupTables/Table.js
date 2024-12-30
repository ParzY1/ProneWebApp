import TableRow from "./TableRow.js";

const Table = {
    render: (rows) => {
        return `<table class="group-table>
            <thead>
                <tr>
                <th>Nazwa</th>
                <th>Opis</th>
                <th>Status</th>
                <th>Akcje</th>
                </tr>
            </thead>
            <tbody>
                ${rows.map(TableRow.render).join('')}
            </tbody>
        </table>`
    },
    fetchGroups: async () => {
        const response = await fetch('/groups/getGroups');
        if (!response.ok) throw new Error('Failed to load groups');
        return response.json();
    }
};

export default Table;