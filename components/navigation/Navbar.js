const Navbar = {
    render: () => {
        return `<div class="logo">
            <img src="../img/logo.png" alt="Prone Logo">
            <p>Prone</p>
        </div>
        <nav>
            <ul>
                <li><a href="/pl/dashboard">Ekran główny</a></li>
                <li><a href="/pl/query_log">Logi zapytań</a></li>
                <li><a href="/pl/groups">Grupy</a></li>
                <li><a href="/pl/adlists">Lista filtrów</a></li>
                <li><a href="/pl/clients">Klienci</a></li>
                <li><a href="/pl/domains">Domeny</a></li>
                <li><a href="/pl/settings">Ustawienia</a></li>
            </ul>
        </nav>`;
    }
};

export default Navbar;