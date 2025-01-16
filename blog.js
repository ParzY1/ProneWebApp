document.getElementById('changelogForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const version = document.getElementById('version').value;
    const changelogText = document.getElementById('changelogText').value;

    // Autoryzacja (możesz dodać bardziej zaawansowaną metodę)
    if (sessionStorage.getItem('isAdmin') === 'true') {
        const data = { version, changelogText };

        fetch('add_changelog.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(responseData => {
            if (responseData.success) {
                document.getElementById('responseMessage').innerHTML = "Changelog został dodany!";
                document.getElementById('changelogForm').reset();
            } else {
                document.getElementById('responseMessage').innerHTML = "Błąd podczas dodawania changeloga.";
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert("Nie masz uprawnień do tego panelu!");
    }
});
