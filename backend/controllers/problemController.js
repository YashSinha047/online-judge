const Problem = require('../models/ProblemModel')
const mongoose = require('mongoose')
const { generateFile } = require('../generateFile')
const { executeCpp } = require('../executeCpp')


// get all problems
const getProblems = async (req, res) => {
    const problems = await Problem.find({}).sort({createdAt: -1})

    res.status(200).json(problems)
}


// get a single problem
const getProblem = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "No such problem"})
    }

    const problem = await Problem.findById(id)

    if(!problem){
        return res.status(404).json({error: "No such problem"})
    }

    res.status(200).json(problem)
}


// create a new problem
const createProblem = async (req,res) => {
    const { title, description, difficulty, testCases } = req.body

    let emptyFields = []
    
    if(!title){
        emptyFields.push('title')
    }
    if(!description){
        emptyFields.push('description')
    }
    if(!difficulty){
        emptyFields.push('difficulty')
    }
    if(!testCases){
        emptyFields.push('testCases')
    }
    if(emptyFields.length > 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }

    try{
        const problem = await Problem.create({title, description, difficulty, testCases})
        res.status(200).json(problem)
    } catch (error){
        res.status(400).json({error: error.message})
    }
}

// submit a problem
const submitProblem = async (req, res) => {
    const { language = 'cpp', code } = req.body;

    if (!code) {
        console.error('Empty code!');
        return res.status(400).json({ success: false, error: "Empty code!" });
    }

    try {
        console.log(`Generating file for language: ${language}`);
        const filePath = await generateFile(language, code);
        console.log(`File generated at: ${filePath}`);
        const output = await executeCpp(filePath);
        console.log(`Execution output: ${output}`);
        res.status(200).json({ success: true, filePath, output });
    } catch (error) {
        console.error('Error during code execution:', error);
        res.status(500).json({ success: false, error: error.message, details: error });
    }
}




// delete a problem
const deleteProblem = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such problem"})
    }

    const problem = await Problem.findOneAndDelete({_id: id})

    if(!problem){
        return res.status(404).json({error: "No such problem"})
    }

    res.status(200).json(problem)
}


// update a problem
const updateProblem = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such problem"})
    }

    const problem = await Problem.findOneAndUpdate({_id: id},{
        ...req.body
    })

    if(!problem){
        return res.status(404).json({error: "No such problem"})
    }

    res.status(202).json(problem)
}

module.exports = {
    createProblem,
    getProblems,
    getProblem,
    updateProblem,
    deleteProblem,
    submitProblem
}