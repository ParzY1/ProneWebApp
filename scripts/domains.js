import BlacklistTable from "../components/blacklistTables/Table.js";
import BlacklistTableRow from "../components/blacklistTables/TableRow.js";
import Form from "../components/forms/AddDomain.js";
import Navbar from "../components/navigation/Navbar.js";
import Footer from "../components/footer/Footer.js";
import WhitelistTable from "../components/whitelistTables/Table.js";
import WhitelistTableRow from "../components/whitelistTables/TableRow.js";

document.addEventListener('DOMContentLoaded', async () => {;
    try{
        renderNavbar();
        renderFooter();
        renderForm();
        const whitelistData = await WhitelistTable.fetchWhitelist();
        const blacklistData = await BlacklistTable.fetchBlacklist();
        const whitelistGroupsData = await WhitelistTable.fetchGroups();
        const blacklistGroupsData = await BlacklistTable.fetchGroups();;
        const whitelistTable = WhitelistTable.render(whitelistData, whitelistGroupsData);
        const blacklistTable = BlacklistTable.render(blacklistData, blacklistGroupsData);
        document.querySelector('.white-list').innerHTML = whitelistTable;
        document.querySelector('.black-list').innerHTML = blacklistTable;
    } catch(error) {
        console.error('Error loading domains or groups:', error.message);
        alert('Nie udało się załadować danych domen i grup.');
        return;
    }

    document.querySelector('.black-list').addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-button')) {
            const row = event.target.closest('tr');
            const domainName = row.cells[0].textContent.trim();

            if(confirm(`Czy na pewno chcesz usunąć domenę ${domainName}?`)){
                try{
                    const response = await BlacklistTableRow.deleteFromBlacklist(domainName);
                    if(response.success) {
                        row.remove();
                        alert('Domena została usunięta.');
                    }
                } catch (error) {
                    console.error('Error deleting domain:', error.message);
                    alert('Nie udało się usunąć domeny.');
                }
            }
        }
    });

    document.querySelector('.white-list').addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-button')) {
            const row = event.target.closest('tr');
            const domainName = row.cells[0].textContent.trim();

            if(confirm(`Czy na pewno chcesz usunąć domenę ${domainName}?`)){
                try{
                    const response = await WhitelistTableRow.deleteFromWhitelist(domainName);
                    console.log(response);
                    if(response.success) {
                        row.remove();
                        alert('Domena została usunięta.');
                    }
                } catch (error) {
                    console.error('Error deleting domain:', error.message);
                    alert('Nie udało się usunąć domeny.');
                }
            }
        }
    });

    document.querySelector('.black-list').addEventListener('change', async (event) => {
        if(event.target.matches('.dropdown-content input[type="checkbox"]')) {
            const groupName = event.target.dataset.group;
            const row = event.target.closest('tr');
            if(!row) return;

            const domainName = row.cells[0].textContent.trim();

            try{
                if(event.target.checked) {
                    await BlacklistTableRow.addDomainToGroup(domainName, groupName);
                } else {
                    await BlacklistTableRow.removeDomainFromGroup(domainName, groupName);
                }
                alert(`Domena ${domainName} została zaaktualizowana dla grupy ${groupName}.`);
            } catch (error) {
                alert(`Nie udało się zaktualizować grupy ${groupName} dla domeny ${domainName}.`);
                console.error('Error updating group: ', error.message);
            }
        }
    });

    document.querySelector('.white-list').addEventListener('change', async (event) => {
        if(event.target.matches('.dropdown-content input[type="checkbox"]')) {
            const groupName = event.target.dataset.group;
            const row = event.target.closest('tr');
            if(!row) return;

            const domainName = row.cells[0].textContent.trim();

            try{
                if(event.target.checked) {
                    await WhitelistTableRow.addDomainToGroup(domainName, groupName);
                } else {
                    await WhitelistTableRow.removeDomainFromGroup(domainName, groupName);
                }
                alert(`Domena ${domainName} została zaaktualizowana dla grupy ${groupName}.`);
            } catch (error) {
                alert(`Nie udało się zaktualizować grupy ${groupName} dla domeny ${domainName}.`);
                console.error('Error updating group: ', error.message);
            }
        }
    });
    
    document.querySelector('.black-list').addEventListener('click', async (event) => {
        if (event.target.classList.contains('edit-button')) {
            const row = event.target.closest('tr');
            await toggleEditMode(row, 0);
        }
    });

    document.querySelector('.white-list').addEventListener('click', async (event) => {
        if (event.target.classList.contains('edit-button')) {
            const row = event.target.closest('tr');
            await toggleEditMode(row, 1);
        }
    });

    document.querySelector('.black-list').addEventListener('change', async (event) => {
        if(event.target.matches('.switch input[type="checkbox"]')) {
            const row = event.target.closest('tr');
            const domainName = row.cells[0].textContent.trim();
            const switchStatus = event.target.closest('.switch input[type="checkbox"]');
            if(switchStatus.checked) {
               await BlacklistTableRow.enableDomain(domainName);
            } else {
                await BlacklistTableRow.disableDomain(domainName);
            }
        }
    });

    document.querySelector('.white-list').addEventListener('change', async (event) => {
        if(event.target.matches('.switch input[type="checkbox"]')) {
            const row = event.target.closest('tr');
            const domainName = row.cells[0].textContent.trim();
            const switchStatus = event.target.closest('.switch input[type="checkbox"]');
            if(switchStatus.checked) {
                await WhitelistTableRow.enableDomain(domainName);
            } else {
                await WhitelistTableRow.disableDomain(domainName);
            }
        }         
    });

    async function toggleEditMode(row, flag) {
        if(!row) return;

        const domainCell = row.cells[0];
        const commentCell = row.cells[1];
        const actionCell = row.cells[4];

        const originalDomain = domainCell.textContent.trim();
        const originalComment = commentCell.textContent.trim();

        domainCell.innerHTML = `<input type="text" class="edit-domain" value="${originalDomain}">`;
        commentCell.innerHTML = `<input type="text" class="edit-comment" value="${originalComment}">`;

        actionCell.innerHTML = `
            <button class="done-button" data-domain="${originalDomain}">✔️</button>
            <button class="delete-button" data-domain="${originalComment}">❌</button>`;
        
        actionCell.querySelector('.done-button').addEventListener('click', async () => {
            const newDomain = domainCell.querySelector('.edit-domain').value.trim();
            const newComment = commentCell.querySelector('.edit-comment').value.trim();

            try{
                if(flag == 0) {
                    if(newDomain !== originalDomain) {
                        await BlacklistTableRow.editDomainName(originalDomain, newDomain);
                    }
    
                    if(newComment !== originalComment) {
                        await BlacklistTableRow.editDomainComment(newDomain, newComment);
                    }
                } else if (flag == 1) {
                    if(newDomain !== originalDomain) {
                        await WhitelistTableRow.editDomainName(originalDomain, newDomain);
                    }

                    if(newComment !== originalDomain) {
                        await WhitelistTableRow.editDomainComment(newDomain, newComment);
                    }
                }

                domainCell.textContent = newDomain;
                commentCell.textContent = newComment;

                actionCell.innerHTML = `
                    <button class="edit-button">📝</button>
                    <button class="delete-button">❌</button>`; 
            } catch (error) {
                alert('Nie ddało się zaaktualizować domeny');
                console.error('Failed to update domain ', error.message);
            }
        });
    }

    document.querySelector('.add-button').addEventListener('click', async () => {
        const domainInput = document.querySelector('#domain');
        const commentInput = document.querySelector('#comment');
        const statusSelect = document.querySelector('#status');
        const domain = domainInput.value.trim();
        const comment = commentInput.value.trim();
        const status = statusSelect.value;

        if (!domain || !comment) {
            alert('Proszę wprowadzić nazwę domeny.');
            return;
        }

        try {
            document.querySelector('#domain').value = '';
            document.querySelector('#comment').value = '';

            if(status === 'allowed'){
                const result = await Form.addToWhitelist(domain, comment);
                if (result.success){
                    const groupsData = await WhitelistTable.fetchGroups();
                    const tableBody = document.querySelector('.whitelist-table');
                    const domainData = {
                        domain: domain,
                        comment: comment,
                        enabled: 1,
                        groups: [0]
                    };
                    const row = WhitelistTableRow.render(domainData, groupsData);
                    alert('Dodano domenę pomyślnie.');
                    tableBody.innerHTML += row;
                } else {
                    alert('Nie udało się dodać domeny');
                    console.error('Failed to add domain.');
                }
            } else {
                const result = await Form.addToBlacklist(domain, comment);
                if (result.success) {
                    const groupsData = await BlacklistTable.fetchGroups();
                    const tableBody = document.querySelector('.blacklist-table');
                    const domainData = {
                        domain: domain,
                        comment: comment,
                        enabled: 1,
                        groups: [0]
                    };
                    const row = BlacklistTableRow.render(domainData, groupsData);
                    tableBody.innerHTML += row;
                } else {
                    alert('Nie udało się dodać domeny');
                    console.error('Failed to add domain.');
                }
            }
        } catch (error) {
            console.error(error);
            alert('Wystąpił błąd podczas dodawania domeny.');
        }
    });

    function renderForm() {
        const addDomainSection = document.querySelector('.add-domain');
        if(!addDomainSection) {
            console.error('Container .add-domain not found.');
            return;
        }

        addDomainSection.innerHTML = Form.render();
    };

    function renderNavbar() {
        const navbar = document.querySelector('.sidebar');
        if(!navbar) {
            console.error('Container .sidebar not found.');
            return;
        }

        navbar.innerHTML = Navbar.render();
    };

    function renderFooter() {
        const body = document.querySelector('body');
        if(!body) {
            console.error('Body not found.');
            return;
        }

        body.innerHTML += Footer.render();
    };

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