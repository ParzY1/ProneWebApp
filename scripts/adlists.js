import Table from "../components/adlistTables/Table.js";
import TableColumn from "../components/adlistTables/TableColumn.js";
import TableRow from "../components/adlistTables/TableRow.js";
import Footer from "../components/footer/Footer.js";
import Form from "../components/forms/AddAdlist.js";
import Navbar from "../components/navigation/Navbar.js";

document.addEventListener('DOMContentLoaded', async () => {
    try{
        const adlistsData = await Table.getAdlists();
        const groupsData = await Table.getGroups();
        const adlistTable = await Table.render(adlistsData, groupsData);
        document.querySelector('.adlist-table').innerHTML = adlistTable;
        renderForm();
        renderNavbar();
        renderFooter();
    } catch(error) {
        console.error('Error loading adlists or groups: ', error.message);
        alert('Nie udało się załadować stron poprawnie.');
        return;
    }

    document.querySelector('.adlist-table').addEventListener('click', async (event) => {
        if (event.target.classList.contains('delete-button')) {
            const row = event.target.closest('tr');
            const adlistAddress = row.cells[0].textContent.trim();
    
            if (confirm(`Czy na pewno chcesz usunąć listę filtrów: ${adlistAddress}?`)) {
                try {
                    const response = await TableRow.deleteAdlist(adlistAddress);
                    console.log(response);
                    if (response.message) {
                        alert('Lista filtrów została usunięta');
                        row.remove();
                    } else {
                        console.error('Failed to delete the adlist.');
                        alert('Nie udało się usunąć listy filtrów');
                    }
                } catch (error) {
                    console.error('Error deleting adlist: ', error.message);
                    alert('Nie udało się usunąć listy filtrów');
                }
            }
        }

        if(event.target.classList.contains('edit-button')) {
            const row = event.target.closest('tr');
            await toggleEditMode(row);
        }
    });

    document.querySelector('.adlist-table').addEventListener('change', async (event) => {
        if (event.target.matches('.dropdown-content input[type="checkbox"]')) {
            const groupName = event.target.dataset.group;
            const row = event.target.closest('tr');
            if(!row) return;
            const adlistAddress = row.cells[0].querySelector('a').textContent.trim();
            console.log(adlistAddress);
            try {
                if(event.target.checked) {
                    await TableRow.addAdlistToGroup(adlistAddress, groupName);
                } else {
                    await TableRow.removeAdlistFromGroup(adlistAddress, groupName);
                }
                alert(`Lista ${adlistAddress} została zaaktualizowana dla grupy ${groupName}.`);
            } catch (error) {
                console.error('Error updating adlist group: ', error.message);
                alert('Nie udało się zaaktualizować grup listy filtrów');
            }
        }

        if(event.target.matches('.switch input[type="checkbox"]')) {
            console.log('tick')
            const row = event.target.closest('tr');
            const adlistAddress = row.cells[0].textContent.trim();
            const switchStatus = event.target.closest('.switch input[type="checkbox"]');
            if(switchStatus.checked) {
                await TableRow.enableAdlist(adlistAddress);
            } else {
                await TableRow.disableAdlist(adlistAddress);
            }
        }
    });

    document.querySelector('.add-button').addEventListener('click', async () => {
        const address = document.getElementById('adlist-address').value;
        const comment = document.getElementById('adlist-comment').value;

        if (!address.trim()) {
            alert('Adres jest wymagany!');
            return;
        }

        try {
            const response = await Form.addAdlist(address, comment);
            if (response.success) {
                const tableBody = document.querySelector('#adlist-table-body');
                const groupsData = await Table.getGroups();
                const adlist = {
                    address: address,
                    comment: comment,
                    enabled: 1
                };
                const row = await TableRow.render(adlist, groupsData);
                alert('Nowa lista została dodana.');
                tableBody.innerHTML += row;
            } else {
                alert(response.message || 'Nie udało się dodać nowej listy.');
            }

            document.getElementById('adlist-address').value = '';
            document.getElementById('adlist-comment').value = '';
        } catch (error) {
            console.error('Error adding adlist:', error);
            alert('Wystąpił błąd podczas dodawania nowej listy.');
        }
    });

    async function toggleEditMode(row) {
        if(!row) return;
        const adlistAddressCell = row.cells[0];
        const adlistCommentCell = row.cells[1];
        const actionCell = row.cells[4];

        const originalAddress = adlistAddressCell.textContent.trim();
        const originalComment = adlistCommentCell.textContent.trim();

        adlistAddressCell.innerHTML = `<input type="text" class="edit-address" value="${originalAddress}">`;
        adlistCommentCell.innerHTML = `<input type="text" class="edit-comment" value="${originalComment}">`;

        actionCell.querySelector('.edit-button').style.display = 'none';
        actionCell.querySelector('.done-button').style.display = 'inline-block';

        actionCell.querySelector('.done-button').addEventListener('click', async (event) => {
            const newAddress = adlistAddressCell.querySelector('.edit-address').value.trim();
            const newComment = adlistCommentCell.querySelector('.edit-comment').value.trim();

            try {
                if(newAddress !== originalAddress) {
                    await TableRow.editAdlistAddress(originalAddress, newAddress);
                }
                if(newComment !== originalComment) {
                    await TableRow.editAdlistComment(newAddress, newComment);
                }

                adlistAddressCell.innerHTML = TableColumn.address(newAddress);
                adlistCommentCell.innerHTML = TableColumn.text(newComment);

                actionCell.querySelector('.edit-button').style.display = 'inline-block';
                actionCell.querySelector('.done-button').style.display = 'none';
            } catch (error) {
                console.error('Error editing adlist:', error);
                alert('Wystąpił błąd podczas edycji listy filtrów.');
            }
        });
    }

    function renderForm() {
        const addDomainSection = document.querySelector('.add-adlist');
        if(!addDomainSection) {
            console.error('Container .add-adlist not found.');
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
});