import Table from '../components/groupTables/Table.js';
import TableRow from '../components/groupTables/TableRow.js';
import Form from '../components/forms/AddGroup.js';
import Navbar from '../components/navigation/Navbar.js';
import Footer from '../components/footer/Footer.js';

let loaded = false;

document.addEventListener('DOMContentLoaded', async () => {
    renderNavbar();
    renderForm();
    renderFooter();
    await fetchGroups();

    loaded = true;

    document.querySelector('.group-table').addEventListener('click', async (event) => {
        const editButton = event.target.closest('.edit-button');
        const doneButton = event.target.closest('.done-btn');
        const deleteButton = event.target.closest('.delete-button');
        const toggle = event.target.closest('.group-toggle');
        
        if (editButton) {
            enableEditMode(editButton.closest('tr'));
        }
        if (doneButton) {
            await handleEditDone(doneButton.closest('tr'));
        }

        if (deleteButton) {
            const groupName = deleteButton.dataset.groupName;
            await handleDeleteGroup(groupName, deleteButton.closest('tr'));
        }

        if (toggle) {
            const groupName = toggle.dataset.groupName;
            const isEnabled = toggle.checked;
            await toggleGroupStatus(groupName, isEnabled);
        }
    });

    async function fetchGroups() {
        try {
            const { data } = await Table.fetchGroups();
            const tableBody = document.querySelector('.group-table tbody');
            tableBody.innerHTML = '';
    
            data.forEach(group => {
                const row = TableRow.render(group);
                tableBody.innerHTML += row;
            });
        } catch (error) {
            console.error(error.message);
            alert('Nie udało się pobrać danych.');
        }
    }

    function renderForm() {
        const inputSection = document.querySelector('.input-section');
        if (!inputSection) {
            console.error('Container with class "input-section" not found.');
            return;
        }
    
        inputSection.innerHTML = Form.render();
    
        const addButton = document.querySelector('.add-button');
        addButton.addEventListener('click', async () => {
            const name = document.getElementById('group-name').value.trim();
            const description = document.getElementById('group-description').value.trim();
    
            if (!name || !description) {
                alert('Proszę wypełnić oba pola.');
                return;
            }
    
            try {
                const newGroup = await Form.addGroup(name, description);
    
                const group = {
                    name: name,
                    description: description,
                    enabled: 1
                };
    
                addGroupToTable(group);
    
                document.getElementById('group-name').value = '';
                document.getElementById('group-description').value = '';
    
                console.log(newGroup);
            } catch (error) {
                console.error(error.message);
                alert('Nie udało się dodać grupy.');
            }
        });
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

    function enableEditMode(row) {
        const nameCell = row.querySelector('.group-name');
        const descCell = row.querySelector('.group-description');
        const actionCell = row.querySelector('td:last-child');

        const originalName = nameCell.textContent.trim();
        const originalDescription = descCell.textContent.trim();

        nameCell.innerHTML = `<input type="text" class="edit-name" value="${originalName}">`;
        descCell.innerHTML = `<input type="text" class="edit-description" value="${originalDescription}">`;

        actionCell.innerHTML = `
            <button class="done-btn" data-original-name="${originalName}" data-original-description="${originalDescription}">Done</button>`;
        
    }

    async function handleEditDone(row) {
        const nameInput = row.querySelector('.edit-name');
        const descInput = row.querySelector('.edit-description');
        const actionCell = row.querySelector('td:last-child');
        
        const originalName = actionCell.querySelector('.done-btn').dataset.originalName;
        const originalDescription = actionCell.querySelector('.done-btn').dataset.originalDescription;
    
        const newName = nameInput.value.trim();
        const newDescription = descInput.value.trim();
    
        const promises = [];
        let hasChanges = false;
    
        if (newName !== originalName) {
            hasChanges = true;
            promises.push(TableRow.editGroupName(originalName, newName));
        }
    
        if (newDescription !== originalDescription) {
            hasChanges = true;
            promises.push(TableRow.editGroupDescription(newName, newDescription));
        }
    
        try {
            if (hasChanges) {
                await Promise.all(promises);
                alert('Zmiany zostały zapisane.');
            } else {
                alert('Brak zmian.');
            }
    
            nameInput.parentElement.textContent = newName;
            descInput.parentElement.textContent = newDescription;
            actionCell.innerHTML = `
                <button class="edit-button">📝</button>
                <button class="delete-button" data-group-name="${newName}">❌</button>`;
        } catch (error) {
            console.error('Error updating group', error.message);
            alert('Błąd aktualizacji grupy.');
        }
    }
    

    async function handleDeleteGroup(groupName, row) {
        if(!confirm('Jesteś pewny że chcesz usunąć tą grupę?')) {
            return;
        }
        try {
            await TableRow.deleteGroup(groupName);
            row.remove();
        } catch (error) {
            console.error('Error deleting group', error.message);
            alert('Nie udało się usunąć grupy.');
        }
    }

    async function toggleGroupStatus(groupName, isEnabled) {
        try {
            await TableRow.toggleGroupStatus(groupName, isEnabled);
        } catch (error) {
            console.error('Error toggling group status', error.message);
        }
    }

    function addGroupToTable(group) {
        const tableBody = document.querySelector('.group-table tbody');
        if(!tableBody) {
            console.error('Table body not found.');
            return;
        }

        console.log(group.name);
        const row = TableRow.render(group);
        tableBody.innerHTML += row;
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

setTimeout(() => {
    const overlay = document.querySelector('#loading-overlay');
    if (overlay) {
        overlay.remove();
    }
}, loaded);