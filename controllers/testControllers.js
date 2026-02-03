const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const showTests = async (req, res, next) => {
    //#swagger.tags = ['Tests']
    try {
        const result = await mongodb.getDatabase().db().collection('test').find();
        const testSubjects = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(testSubjects);
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching test subjects.', error: error });
    }
};

const createTest = async (req, res, next) => {
    //#swagger.tags = ['Tests']
    try {
        const test = {
            name: req.body.name,
            value: req.body.value
        };
        const result = await mongodb.getDatabase().db().collection('test').insertOne(test);
        if (result.acknowledged) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Some error occurred while creating the test.');
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while creating the test.', error: error });
        return;
    }
};

const updateTest = async (req, res, next) => {
    try {
        // validator
        if (!objectId.isValid(req.params.id)) {
            res.status(400).json('Invalid test ID format');
            return;
        }

        //#swagger.tags = ['Tests']
        const testId = new objectId(req.params.id);
        const test = {
            name: req.body.name,
            value: req.body.value
        }
        const result = await mongodb.getDatabase().db().collection('test').replaceOne({ _id: testId }, test);
        if (result.modifiedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Some error occurred while updating the test.');
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while updating the test.', error: error });
        return;
    }
};

const deleteTest = async (req, res, next) => {
    try {
        // validator
        if (!objectId.isValid(req.params.id)) {
            res.status(400).json('Invalid test ID format');
            return;
        }

        //#swagger.tags = ['Tests']
        const testId = new objectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('test').deleteOne({ _id: testId });
        if (result.deletedCount > 0) {
            res.status(204).send();
        } else {
            res.status(500).json(result.error || 'Some error occurred while deleting the test.');
        }
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while deleting the test.', error: error });
        return;
    }
};

module.exports = {
    createTest,
    showTests,
    updateTest,
    deleteTest
};