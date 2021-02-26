const Express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./database/mongodb');
const session = require('express-session');

const app = Express();

app.use(
  session({
    secret: 'client',
    resave: true,
    saveUninitialized: false,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(Express.static(path.join(__dirname, 'public')));

app.set('views', 'views');
app.set('view engine', 'ejs');

// Public Routes

const registerRoute = require('./routes/register');
const loginRoute = require('./routes/login');

app.use(loginRoute);
app.use(registerRoute);

// Middleware Routes

const sessionHandler = require('./middleware/sessionHandler');

app.use('/', sessionHandler.sessionHandler);

// Chat Routes

const profileRoute = require('./routes/chat/profile');
const tweetAPIRoute = require('./routes/chat/tweet');

app.use(profileRoute);
app.use(tweetAPIRoute);

module.exports = app;
