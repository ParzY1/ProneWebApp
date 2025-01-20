import Table from "../components/clientTables/Table.js";
import TableRow from "../components/clientTables/TableRow.js";
import Form from "../components/forms/AddClient.js";
import Footer from "../components/footer/Footer.js";
import Navbar from "../components/navigation/Navbar.js";

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const clientsData = await Table.fetchClients();
        const groupsData = await Table.fetchGroups();
        const table = Table.render(clientsData.data, groupsData);
        document.querySelector('.clients-table-container').innerHTML = table;
        renderForm();
        renderNavbar();
        renderFooter();
    } catch (error) {
        console.error('Error loading clients or groups:', error.message);
        alert('Nie udało się załadować danych klientów i grup.');
        return;
    }

    document.querySelector('.clients-table').addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-button')) {
            const row = event.target.closest('tr');
            const clientIp = row.cells[0].textContent.trim();

            if (confirm(`Czy na pewno chcesz usunąć klienta ${clientIp}?`)) {
                try {
                    await TableRow.deleteClient(clientIp);
                    row.remove();
                    alert('Klient został usunięty.');
                } catch (error) {
                    alert('Nie udało się usunąć klienta.');
                    console.error('Error removing client:', error);
                }
            }
        }
    });

    document.querySelector('.clients-table').addEventListener('click', async (event) => {
        if (event.target.classList.contains('edit-button')) {
            const row = event.target.closest('tr');
            await toggleEditMode(row);
        }
    });

    document.querySelector('.add-button').addEventListener('click', async () => {
        const ip = document.querySelector('#client-name').value.trim();
        const comment = document.querySelector('#comment').value.trim();

        if (!ip) {
            alert('Proszę wprowadzić IP klienta.');
            return;
        }

        try {
            const result = await Form.addClient(ip, comment);
            const groupsData = await Table.fetchGroups();

            if (result.success) {
                alert('Klient dodany pomyślnie.');
                document.querySelector('#client-name').value = '';
                document.querySelector('#comment').value = '';

                const tableBody = document.querySelector('.clients-table tbody');
                const client = {
                    ip: ip,
                    comment: comment,
                    groups: 'Default'
                };
                const row = TableRow.render(client, groupsData);
                tableBody.innerHTML += row;
            } else {
                alert('Nie udało się dodać klienta.');
            }
            } catch (error) {
                console.error(error);
                alert('Wystąpił błąd podczas dodawania klienta.');
            }
    });

    document.querySelector('.clients-table-container').addEventListener('change', async (event) => {
        if (event.target.matches('.dropdown-content input[type="checkbox"]')) {
            const groupName = event.target.dataset.group;
            const row = event.target.closest('tr');
            if (!row) return;
    
            const clientIp = row.cells[0].textContent.trim();
    
            try {
                if (event.target.checked) {
                    await TableRow.addClientToGroup(clientIp, groupName);
                } else {
                    await TableRow.removeClientFromGroup(clientIp, groupName);
                }
                alert(`Grupa ${groupName} została zaktualizowana dla klienta ${clientIp}.`);
            } catch (error) {
                alert(`Nie udało się zaktualizować grupy ${groupName} dla klienta ${clientIp}.`);
                console.error('Error updating group:', error);
            }
        }
    });    

    async function toggleEditMode(row) {
        if (!row) return;
    
        const ipCell = row.cells[0];
        const commentCell = row.cells[1];
        const actionCell = row.cells[3];
    
        const originalIp = ipCell.textContent.trim();
        const originalComment = commentCell.textContent.trim();
    
        ipCell.innerHTML = `<input type="text" class="edit-ip" value="${originalIp}">`;
        commentCell.innerHTML = `<input type="text" class="edit-comment" value="${originalComment}">`;
    
        actionCell.innerHTML = `
            <button class="done-button">Zakończ</button>
        `;
    
        actionCell.querySelector('.done-button').addEventListener('click', async () => {
            const newIp = ipCell.querySelector('.edit-ip').value.trim();
            const newComment = commentCell.querySelector('.edit-comment').value.trim();
    
            try {
                if (newIp !== originalIp) {
                    await TableRow.editClientIp(originalIp, newIp);
                }
    
                if (newComment !== originalComment) {
                    await TableRow.editClientComment(originalIp, newComment);
                }
    
                alert('Zaktualizowano klienta.');
                ipCell.textContent = newIp;
                commentCell.textContent = newComment;
    
                actionCell.innerHTML = `
                    <button class="edit-button">📝</button>
                    <button class="delete-button">❌</button>`;
            } catch (error) {
                alert('Nie udało się zaktualizować klienta.');
                console.error(error);
            }
        });
    }
    
    function renderForm() {
        const addClientSection = document.querySelector('.add-client-section');
        if(!addClientSection) {
            console.error('Container .add-client-section not found.');
            return;
        }
        addClientSection.innerHTML = Form.render();
    }

    function renderNavbar() {
        const navbar = document.querySelector('.sidebar');
        if (!navbar) {
            console.error('Container with class "sidebar" not found.');
            return;
        }

        navbar.innerHTML = Navbar.render();
    }

    function renderFooter() {
        const body = document.querySelector('body');
        if (!body) {
            console.error('Body not found.');
            return;
        }
        body.innerHTML += Footer.render();
    }

    document.getElementById('logout-link').addEventListener('click', async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('/api/logout', { method: 'POST' });
            if (!response.ok) throw new Error('Failed to log out.');
            window.location.href = '/pl';
        } catch (error) {
            console.error('Error logging out:', error);
        }
    });
});