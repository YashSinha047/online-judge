const express = require('express')
const {
    createProblem,
    getProblems,
    getProblem,
    deleteProblem,
    updateProblem,
    submitProblem
} = require('../controllers/problemController')
const requireAuth = require('../middleware/requireauth')

const router = express.Router()

// require auth for problem routes
router.use(requireAuth)

// GET all problems
router.get('/', getProblems)

// GET a single problem
router.get('/:id', getProblem)

// CREATE a problem
router.post('/', createProblem)

// Submit a problem
router.post('/:id', submitProblem)

// Delete a problem
router.delete('/:id', deleteProblem)

// UPDATE a problem
router.patch('/:id', updateProblem)

module.exports = router