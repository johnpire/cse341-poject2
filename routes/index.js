const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => {
    //#swagger.tags = ['Home']
    res.send('Welcome to the Home Page');
});

router.use('/test', require('./testRoutes'));
router.use('/exam', require('./examRoutes'));

module.exports = router;