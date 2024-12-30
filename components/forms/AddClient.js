const Form = {
    render: () => {
        return `<h2>Dodaj nowego klienta</h2>
                <div class="input-group">
                    <label for="client-name">Klienci:</label>
                    <input type="text" id="client-name" placeholder="Wpisz nazwę klienta">

                    <label for="comment">Komentarz:</label>
                    <input type="text" id="comment" placeholder="Wpisz komentarz">
                </div>
                <div class="tips">
                    <p><strong>Wskazówki:</strong></p>
                    <ul>
                        <li>Możesz wybrać istniejącego klienta lub dodać nowego, wpisując powyżej i potwierdzając enterem.</li>
                        <li>Klienci mogą być opisani poprzez adresy IP (IPv4 i IPv6 są obsługiwane), podsieci IP (notacja CIDR, np. 192.168.2.0/24), adresy MAC (np. 12:34:56:78:9A:BC), </li>
                        <li>nazwy hostów (np. localhost) lub interfejsy, do których są podłączone (poprzedzone dwukropkiem, np. :eth0).</li>
                    </ul>
                </div>
                <button class="add-button">Dodaj</button>`;
    },
    addClient: async (ip, comment) => {
        const response = await fetch('/clients/addClient', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ip, comment })
        });
        if (!response.ok) throw new Error('Failed to add client');
        return response.json();
    }
}

export default Form;