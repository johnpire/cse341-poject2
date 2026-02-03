const mongodb = require('../data/database');
const objectId = require('mongodb').ObjectId;

const showTests = async (req, res, next) => {
    //#swagger.tags = ['Tests']
    const result = await mongodb.getDatabase().db().collection('test').find();
    result.toArray().then((testSubjects) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(testSubjects);
        }).catch((err) => {
        res.status(500).json({ message: 'Failed to retrieve test subjects.', error: err });
    });
};

const createTest = async (req, res, next) => {
    //#swagger.tags = ['Tests']
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
};

const updateTest = async (req, res, next) => {
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
};

const deleteTest = async (req, res, next) => {
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
};

module.exports = {
    createTest,
    showTests,
    updateTest,
    deleteTest
};