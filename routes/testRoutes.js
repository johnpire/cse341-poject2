const express = require('express');
const router = express.Router();
const testController = require('../controllers/testControllers');
const validateTest = require('../middleware/validateTest');

router.get('/', testController.showTests);
router.post('/', validateTest.saveTest, testController.createTest);
router.put('/:id', validateTest.saveTest, testController.updateTest);
router.delete('/:id', testController.deleteTest);

module.exports = router;