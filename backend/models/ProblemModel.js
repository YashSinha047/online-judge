const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testCaseSchema = new Schema({
    input: { type: String, required: true },
    output: { type: String, required: true }
});

const problemSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
    sampleTestCases: [testCaseSchema],
    hiddenTestCases: [testCaseSchema]
});

const Problem = mongoose.model('Problem', problemSchema);

module.exports = Problem;
