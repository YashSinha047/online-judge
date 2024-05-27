const mongoose = require('mongoose')

const Schema = mongoose.Schema

const problemSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    difficulty: {
        type: String,
        enum: ['easy', 'medium', 'hard'],
        required: true
    },
    testCases: [{
        input: {
            type: String,
            required: true
        },
        output: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true})

module.exports = mongoose.model('Problem', problemSchema);