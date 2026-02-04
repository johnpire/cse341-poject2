const express = require('express');
const router = express.Router();
const testController = require('../controllers/testControllers');
const validateTest = require('../middleware/validateTest');

// Check if 'test' is authenticated before proceeding
const { isAuthenticated } = require('../middleware/authenticate');

router.get('/', testController.showTests);
router.post('/', isAuthenticated, validateTest.saveTest, testController.createTest);
router.put('/:id', isAuthenticated, validateTest.saveTest, testController.updateTest);
router.delete('/:id', isAuthenticated, testController.deleteTest);

module.exports = router;