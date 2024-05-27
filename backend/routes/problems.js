const express = require('express')
const {
    createProblem,
    getProblems,
    getProblem,
    deleteProblem,
    updateProblem
} = require('../controllers/problemController')


const router = express.Router()

// GET all problems
router.get('/', getProblems)

// GET a single problem
router.get('/:id', getProblem)

// CREATE a problem
router.post('/', createProblem)

// Delete a problem
router.delete('/:id', deleteProblem)

// UPDATE a problem
router.patch('/:id', updateProblem)

module.exports = router