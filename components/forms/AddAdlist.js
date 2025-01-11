const Form = {
    render: () => {
        return `<h2>Dodaj nową listę</h2>
                <div class="adlist-form">
                    <label for="adlist-address">Adres:</label>
                    <input type="text" id="adlist-address" placeholder="URL lub adresy oddzielone spacją">
                    <label for="adlist-comment">Komentarz:</label>
                    <input type="text" id="adlist-comment" placeholder="Opis listy (opcjonalne)"><br>
                </div>
                <button type="button" id="add-adlist-button" class="add-button">Dodaj</button>`;
    },
    addAdlist: async (address, comment) => {
        const response = await fetch('/adlists/addAdlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ address, comment })
        });
        if (!response.ok) throw new Error('Failed adding to adlist.');
        return response.json();
    }
};

export default Form;