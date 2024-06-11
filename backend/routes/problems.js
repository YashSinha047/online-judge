const express = require('express')
const {
    createProblem,
    getProblems,
    getProblem,
    deleteProblem,
    updateProblem,
    submitProblem,
    submitCode
} = require('../controllers/problemController')
const requireauth = require('../middleware/requireauth')

const router = express.Router()

// require auth for problem routes
router.use(requireauth)

// GET all problems
router.get('/', getProblems)

// GET a single problem
router.get('/:id', getProblem)

// CREATE a problem
router.post('/', createProblem)

// Run code for a problem
router.post('/:id/run', submitProblem)

// Submit code
router.post('/:id/submit', submitCode);

// Delete a problem
router.delete('/:id', deleteProblem)

// UPDATE a problem
router.patch('/:id', updateProblem)

module.exports = router