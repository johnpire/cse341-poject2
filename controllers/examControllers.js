const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const showExams = async (req, res, next) => {
    //#swagger.tags = ['Exams']
    try {
        const result = await mongodb.getDatabase().db().collection('exam').find();
        const examSubjects = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(examSubjects);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching exam subjects.', error: error });
    }
};

const createExam = async (req, res, next) => {
    //#swagger.tags = ['Exams']
    try {
        const exam = {
            name: req.body.name,
            number: req.body.number,
            email: req.body.email
        };
        const result = await mongodb.getDatabase().db().collection('exam').insertOne(exam);
        if (result.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Some error occurred while creating the exam.');
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the exam.', error: error });
        return;
    }
};

const updateExam = async (req, res, next) => {
    try {
        // validator
        if (!objectId.isValid(req.params.id)) {
            res.status(400).json('Invalid exam ID format');
            return;
        }   

        //#swagger.tags = ['Exams']
        const examId = new objectId(req.params.id);
        const exam = {
            name: req.body.name,
            number: req.body.number,
            email: req.body.email
        }
        const result = await mongodb.getDatabase().db().collection('exam').replaceOne({ _id: examId }, exam);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Some error occurred while updating the exam.');
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the exam.', error: error });
        return;
    }
};

const deleteExam = async (req, res, next) => {
    try {
        // validator
        if (!objectId.isValid(req.params.id)) {
            res.status(400).json('Invalid exam ID format');
            return;
        }

        //#swagger.tags = ['Exams']
        const examId = new objectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('exam').deleteOne({ _id: examId });
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Some error occurred while deleting the exam.');
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the exam.', error: error });
        return;
    }
};

module.exports = {
    createExam,
    showExams,
    updateExam,
    deleteExam
};