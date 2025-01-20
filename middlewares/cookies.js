const cookieHandler = (req, res) => {
    const cookieName = req.cookies.name;

    if(!cookieName) throw new Error('No cookie found.');
    res.json({ name: cookieName });
};

const logout = (req, res) => {
    res.clearCookie('name');
    res.clearCookie('token');
    res.json({ message: 'Logged out successfully.' });
};

module.exports = { cookieHandler, logout };