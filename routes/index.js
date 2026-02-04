const router = require('express').Router();
const passport = require('passport');

router.use('/', require('./swagger'));

router.use('/test', require('./testRoutes'));
router.use('/exam', require('./examRoutes'));

// login and logout routes
router.get('/login', passport.authenticate('github', (req, res) => {
    //#swagger.tags = ['Authentication']
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
}));

router.get('/logout', function(req, res, next) {
    //#swagger.tags = ['Authentication']
    req.logout(function(err) {
        if (err) {
            return next(err); }
            res.redirect('/');
        });
    }
);

module.exports = router;