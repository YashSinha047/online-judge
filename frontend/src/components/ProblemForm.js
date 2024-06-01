import { useState } from "react";
import { useProblemsContext } from "../hooks/useProblemsContext";
import { useAuthContext } from "../hooks/useAuthContext";


const ProblemForm = () => {
    const { dispatch } = useProblemsContext();
    const { user } = useAuthContext()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleAddTestCase = () => {
        setTestCases([...testCases, { input: '', output: '' }]);
    };

    const handleTestCaseChange = (index, type, value) => {
        const newTestCases = [...testCases];
        newTestCases[index][type] = value;
        setTestCases(newTestCases);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user) {
            setError('You must be logged in')
            return
        }

        const emptyFields = [];
        if (!title) emptyFields.push('title');
        if (!description) emptyFields.push('description');
        if (!difficulty) emptyFields.push('difficulty');
        testCases.forEach((testCase, index) => {
            if (!testCase.input) emptyFields.push(`testCaseInput-${index}`);
            if (!testCase.output) emptyFields.push(`testCaseOutput-${index}`);
        });

        if (emptyFields.length > 0) {
            setEmptyFields(emptyFields);
            setError('Please fill in all the fields');
            return;
        }

        const problem = { title, description, difficulty, testCases };

        const response = await fetch('/api/problems', {
            method: 'POST',
            body: JSON.stringify(problem),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.token}`
            }
        });

        const json = await response.json();

        if (!response.ok) {
            setError(json.error);
            setEmptyFields(json.emptyFields);
        } else {
            setTitle('');
            setDescription('');
            setDifficulty('easy');
            setTestCases([{ input: '', output: '' }]);
            setError(null);
            setEmptyFields([]);
            console.log('new problem added', json);
            dispatch({ type: 'CREATE_PROBLEM', payload: json });
        }
    };

    return (
        <form className="problem-form" onSubmit={handleSubmit}>
            <h3>Add a new problem</h3>

            {error && <div className="error">{error}</div>}

            <label>Problem Title:</label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error-field' : ''}
            />

            <label>Problem Description:</label>
            <textarea
                onChange={(e) => setDescription(e.target.value)}
                value={description}
                className={emptyFields.includes('description') ? 'error-field' : ''}
            ></textarea>

            <label>Difficulty:</label>
            <select
                onChange={(e) => setDifficulty(e.target.value)}
                value={difficulty}
                className={emptyFields.includes('difficulty') ? 'error-field' : ''}
            >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
            </select>

            <h4>Test Cases</h4>
            {testCases.map((testCase, index) => (
                <div key={index} className="test-case">
                    <label>Input:</label>
                    <input
                        type="text"
                        onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                        value={testCase.input}
                        className={emptyFields.includes(`testCaseInput-${index}`) ? 'error-field' : ''}
                    />
                    <label>Output:</label>
                    <input
                        type="text"
                        onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                        value={testCase.output}
                        className={emptyFields.includes(`testCaseOutput-${index}`) ? 'error-field' : ''}
                    />
                </div>
            ))}
            <button type="button" onClick={handleAddTestCase}>Add Test Case</button>

            <button type="submit">Add Problem</button>
        </form>
    );
};

export default ProblemForm;
