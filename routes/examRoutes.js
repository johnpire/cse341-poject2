const express = require('express');
const router = express.Router();
const examController = require('../controllers/examControllers');
const validateExam = require('../middleware/validateExam');

router.get('/', examController.showExams);
router.post('/', validateExam.saveExam, examController.createExam);
router.put('/:id', validateExam.saveExam, examController.updateExam);
router.delete('/:id', examController.deleteExam);

module.exports = router;