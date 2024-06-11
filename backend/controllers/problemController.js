const Problem = require('../models/ProblemModel')
const mongoose = require('mongoose')
const { generateFile } = require('../utils/generateFile');
const { executeCpp } = require('../utils/executeCpp');
const { executePython } = require('../utils/executePython');



// get all problems
const getProblems = async (req, res) => {
    try {
        // Fetch problems and include only relevant fields (e.g., exclude hiddenTestCases)
        const problems = await Problem.find({}, 'title description difficulty sampleTestCases').sort({ createdAt: -1 });
        res.status(200).json(problems);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};



// get a single problem
const getProblem = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "No such problem" });
    }

    try {
        // Fetch the problem by ID and include only relevant fields
        const problem = await Problem.findById(id, 'title description difficulty sampleTestCases hiddenTestCases');

        if (!problem) {
            return res.status(404).json({ error: "No such problem" });
        }

        res.status(200).json(problem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// create a new problem
const createProblem = async (req, res) => {
    const { title, description, difficulty, sampleTestCases, hiddenTestCases } = req.body;

    let emptyFields = [];

    if (!title) {
        emptyFields.push('title');
    }
    if (!description) {
        emptyFields.push('description');
    }
    if (!difficulty) {
        emptyFields.push('difficulty');
    }
    if (!sampleTestCases || sampleTestCases.length === 0) {
        emptyFields.push('sampleTestCases');
    }
    if (!hiddenTestCases || hiddenTestCases.length === 0) {
        emptyFields.push('hiddenTestCases');
    }

    sampleTestCases.forEach((testCase, index) => {
        if (!testCase.input) emptyFields.push(`sampleTestCaseInput-${index}`);
        if (!testCase.output) emptyFields.push(`sampleTestCaseOutput-${index}`);
    });

    hiddenTestCases.forEach((testCase, index) => {
        if (!testCase.input) emptyFields.push(`hiddenTestCaseInput-${index}`);
        if (!testCase.output) emptyFields.push(`hiddenTestCaseOutput-${index}`);
    });

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    try {
        const problem = await Problem.create({
            title,
            description,
            difficulty,
            sampleTestCases,
            hiddenTestCases
        });
        res.status(200).json(problem);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// submit a problem
const submitProblem = async (req, res) => {
    const { language = 'cpp', code, input } = req.body;

    if (!code) {
        console.error('Empty code!');
        return res.status(400).json({ success: false, error: "Empty code!" });
    }

    try {
        console.log(`Generating file for language: ${language}`);
        const filePath = await generateFile(language, code);
        console.log(`File generated at: ${filePath}`);
        let output;
        switch (language) {
            case 'cpp':
                output = await executeCpp(filePath, input);
                break;
            case 'python':
                output = await executePython(code, input);
                break;
            default:
                throw new Error('Unsupported language');
        }
        console.log(`Execution output: ${output}`);
        res.status(200).json({ success: true, filePath, output });
    } catch (error) {
        console.error('Error during code execution:', error);
        res.status(500).json({ success: false, error: error.message, details: error });
    }
};


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

const evaluateCodeAgainstTestCases = async (code, language, hiddenTestCases) => {
    try {
        for (const testCase of hiddenTestCases) {
            let output;
            let filePath;
            switch (language) {
                case 'cpp':
                    filePath = await generateFile(language, code);
                    output = await executeCpp(filePath, testCase.input);
                    console.log(`Execution output: ${output}`);
                    break;
                case 'python':
                    filePath = await generateFile(language, code);
                    output = await executePython(code, testCase.input);
                    console.log(`Execution output: ${output}`);
                    break;    
                // Add cases for other languages if needed
                default:
                    throw new Error('Unsupported language');
            }

            console.log(output.trim());
            console.log(testCase.output.trim());
            if (output.trim() !== testCase.output.trim()) {
                return 'rejected';
            }
        }
        return 'accepted';
    } catch (error) {
        console.error('Error evaluating code against test cases:', error);
        throw new Error('Failed to evaluate code against test cases.');
    }
};

const submitCode = async (req, res) => {
    const { language, code } = req.body;
    const { id } = req.params;

    try {
        const problem = await Problem.findById(id);

        if (!problem) {
            return res.status(404).json({ error: 'Problem not found' });
        }

        const hiddenTestCases = problem.hiddenTestCases;
        console.log('Hidden Test Cases:', hiddenTestCases); // Log the hidden test cases array

        let status;

        switch (language) {
            case 'cpp':
                status = await evaluateCodeAgainstTestCases(code, language, hiddenTestCases);
                break;
            case 'python':
                status = await evaluateCodeAgainstTestCases(code, language, hiddenTestCases);
                break;    
            // Add cases for other languages if needed
            default:
                throw new Error('Unsupported language');
        }

        return res.json({ status });
    } catch (error) {
        console.error('Error evaluating code:', error);
        return res.status(500).json({ error: 'Failed to evaluate code' });
    }
};




module.exports = {
    createProblem,
    getProblems,
    getProblem,
    updateProblem,
    deleteProblem,
    submitProblem,
    submitCode
}