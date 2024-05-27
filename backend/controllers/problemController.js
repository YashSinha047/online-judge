const Problem = require('../models/ProblemModel')
const mongoose = require('mongoose')

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

    try{
        const problem = await Problem.create({title, description, difficulty, testCases})
        res.status(200).json(problem)
    } catch (error){
        res.status(400).json({error: error.message})
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
    deleteProblem
}