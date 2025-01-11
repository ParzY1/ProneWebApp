import TableRow from "./TableRow.js";

const Table = {
    render: async (adlists, allGroups) => { 
        return `
            <thead>
                <tr>
                    <th>Adres</th>
                    <th>Komentarz</th>
                    <th>Status</th>
                    <th>Przypisanie do grupy</th>
                    <th>Akcje</th>
                </tr>
            </thead>
            <tbody id="adlist-table-body">
                ${adlists.length > 0
                    ? await Promise.all(adlists.map(adlist => TableRow.render(adlist, allGroups)))
                    : '<tr><td colspan="5">Nie udało się załadować danych.</td></tr>'
                }
            </tbody>`
    },
    getAdlists: async () => {
        const response = await fetch('/adlists/getAdlists', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok) throw new Error('Failed to get adlists');
        const json = await response.json();
        return json.data;
    },
    getGroups: async () => {
        const response = await fetch('/groups/getGroups', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if(!response.ok) throw new Error('Failed to get groups');
        const json = await response.json();
        return json.data;
    },
    getAdlistGroups: async (address) => {
        const response = await fetch('/adlists/getAdlistGroups', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({address})
        });
        if(!response.ok) throw new Error('Failed to get adlist groups');
        const json = await response.json();
        return json.data;
    }
};

export default Table;