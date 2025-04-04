const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const groupRoutes = require('./routes/groupRoutes');
const clientRoutes = require('./routes/clientRoutes');
const domainRoutes = require('./routes/domainRoutes');
const queryRoutes = require('./routes/queryRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const adlistRoutes = require('./routes/adlistRoutes');
const cookieParser = require('cookie-parser');
const { loginHandler } = require('./middlewares/auth');
const { cookieHandler, logout } = require('./middlewares/cookies');

const PORT = 3000;
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Static files
app.use('/img', express.static(path.join(__dirname, 'img')));
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/components', express.static(path.join(__dirname, 'components')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/login', loginHandler);
app.post('/api/logout', logout);
app.get('/api/getUsername', cookieHandler);

// Group routes
app.use('/groups', groupRoutes);
app.use('/clients', clientRoutes);
app.use('/domains', domainRoutes);
app.use('/adlists', adlistRoutes);
app.use('/logs', queryRoutes);
app.use('/dashboard', dashboardRoutes);

// Polish Routes
app.get('/pl/:page', (req, res) => {
    const page = req.params.page;
    const validPages = ['login', 'dashboard', 'adlists', 'clients', 'domains', 'groups', 'query_log', 'settings'];
    if (validPages.includes(page)) {
        res.sendFile(path.join(__dirname, `pl/${page}.html`));
    } else {
        res.status(404).send('Page not found');
    }
});

// English Routes
app.get('/en/:page', (req, res) => {
    const page = req.params.page;
    const validPages = ['login', 'dashboard', 'adlists', 'clients', 'domains', 'groups', 'query_log', 'settings'];
    if (validPages.includes(page)) {
        res.sendFile(path.join(__dirname, `en/${page}.html`));
    } else {
        res.status(404).send('Page not found');
    }
});

app.get('/blog/:lang', (req, res) => {
    const lang = req.params.lang;
    if (lang === 'pl') {
        res.sendFile(path.join(__dirname, 'views', 'blog_pl.html'));
    } else {
        res.sendFile(path.join(__dirname, 'views', 'blog_en.html'));
    }
});

app.get('/:lang', (req, res) => {
    const lang = req.params.lang;
    if (lang === 'pl') {
        res.sendFile(path.join(__dirname, 'views', 'index_pl.html'));
    } 
    if (lang === 'en') {
        res.sendFile(path.join(__dirname, 'views', 'index_en.html'));
    }
});

app.get('/', (req, res) => {
    res.redirect('/pl');
});

app.use((req, res) => {
    res.status(404).send('Page not found');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
