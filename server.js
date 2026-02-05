const express = require('express');
const mongodb = require('./data/database');
const app = express();
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

// Middleware to parse JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 3090;
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
// initialize passport
app.use(passport.initialize());
// then tying to use passport session
app.use(passport.session());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});
// CORS security setup | allows controlled access to backend resources
app.use(cors({methods : ['GET','POST','DELETE','UPDATE','PUT','PATCH']}));
app.use(cors({origin: '*'}));
app.use('/', require('./routes'));

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

// Passport GitHub Strategy configuration
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    // In a real application, you'd save the user info to your database here
    //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
}
));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((obj, done) => {
    done(null, obj);
}); 

app.get('/', (req, res) => {
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : 'Not logged in');
});

app.get('/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/', session: false }),
    function(req, res) {
        req.session.user = req.user;
        res.redirect('/');
    }
);

// GitHub authentication routes
app.get('/auth/github/callback',
    passport.authenticate('github', { scope: [ 'user:email' ] }));

mongodb.initDB((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is listening and node Running on port ${port}`);});
    }
});