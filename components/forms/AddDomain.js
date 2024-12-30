const Form = {
    render: () => {
        return `<h2>Dodaj nową domenę</h2>
            <label for="domain">Domena:</label>
            <input type="text" id="domain" placeholder="Wprowadź domenę">
            
            <label for="comment">Komentarz:</label>
            <input type="text" id="comment" placeholder="Wprowadź komentarz">
            
            <label for="status">Status:</label>
            <select id="status">
                <option value="allowed">Dozwolone</option>
                <option value="blocked">Zablokowane</option>
            </select>

            <div class="tips">
                <p><strong>Wskazówki:</strong></p>
                <ul>
                    <li>Można dodać wiele domen, oddzielając każdą nazwę domeny spacją.</li>
                    <li>Nazwy domen mogą zawierać spacje, jeśli są wprowadzone w cudzysłowiu. Na przykład "example.com".</li>
                </ul>
            </div>
            <button class="add-button">Dodaj</button>`;
    },
    addToBlacklist: async (domain, comment) => {
        const response = await fetch('/domains/addToBlacklist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ domain, comment })
        });
        if (!response.ok) throw new Error('Failed to add to blacklist');
        return response.json();
    },
    addToWhitelist: async (domain, comment) => {
        const response = await fetch('/domains/addToWhitelist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ domain, comment })
        });
        if(!response.ok) throw new Error('Failed to add to whitelist');
        return response.json();
    }
}

export default Form;