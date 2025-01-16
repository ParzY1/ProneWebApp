const fetch = require('node-fetch');

let storedToken = '';

const loginHandler = async (req, res) => {
    const { identifier, password } = req.body;

    try {
        const response = await fetch('https://blockdns.garageit.pl/users/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ identifier, password }),
        });

        if (!response.ok) {
            return res.status(response.status).json({ error: 'Login failed' });
        }

        const { token, refreshToken } = await response.json();

        storedToken = token;

        console.log('Token stored in memory:', storedToken);

        return res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ error: error.message });
    }
};

const getStoredToken = () => storedToken;

module.exports = { loginHandler, getStoredToken};