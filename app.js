const Express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const database = require('./database/mongodb');
const session = require('express-session');
const dotenv = require('dotenv');

const app = Express();

dotenv.config({ path: 'dotenv.config.env' });

app.use('/', (req, res, next) => {
  console.log(`HTTP ${req.httpVersion} ${req.method} ${req.originalUrl}`.green);
  next();
});

app.use(
  session({
    secret: process.env.CLIENT_SECRET,
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
const privacyPolicy = require('./routes/privacyPolicy');

app.use(loginRoute);
app.use(privacyPolicy);
app.use(registerRoute);

// Middleware Routes

const sessionHandler = require('./middleware/sessionHandler');

app.use('/', sessionHandler.sessionHandler);

// Chat Routes

const profileRoute = require('./routes/chat/profile');
const tweetAPIRoute = require('./routes/chat/tweet');

app.use(profileRoute);
app.use(tweetAPIRoute);

// API Routes

// Security

const securityRoute = require('./routes/api/chat/security/userCredentials');
const credentialQuestion = require('./routes/api/chat/security/credentialQuestion');

app.use(securityRoute);
app.use(credentialQuestion);

module.exports = app;
