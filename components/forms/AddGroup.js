const Form = {
    render: () => {
        return `<label for="group-name">Nazwa grupy:</label>
                <input type="text" id="group-name" placeholder="Wpisz nazwę grupy">
                
                <label for="group-description">Opis:</label>
                <input id="group-description" placeholder="Wpisz opis grupy">
                <br>

                <div class="tips">
                    <p><strong>Wskazówki:</strong></p>
                    <ul>
                        <li> Można dodać wiele grup, oddzielając każdą nazwę grupy spacją.</li>
                        <li> Nazwa grup może zawierać spacje, jeśli jest wprowadzona w cudzysłowie. Np. "Moja nowa grupa".</li>
                    </ul>
                </div>
                <br>
                <button class="add-button">Dodaj</button>
                `;
    },

    addGroup: async (name, description) => {
        const response = await fetch('/groups/addGroup',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name, description})
        });
        if (!response.ok) throw new Error('Failed to add group');
        return response.json();
    }
}

export default Form;