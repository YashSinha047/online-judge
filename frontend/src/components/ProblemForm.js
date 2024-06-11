import { useState } from "react";
import { useProblemsContext } from "../hooks/useProblemsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const ProblemForm = () => {
    const { dispatch } = useProblemsContext();
    const { user } = useAuthContext();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [difficulty, setDifficulty] = useState('easy');
    const [sampleTestCases, setSampleTestCases] = useState([{ input: '', output: '' }]);
    const [hiddenTestCases, setHiddenTestCases] = useState([{ input: '', output: '' }]);
    const [error, setError] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const handleAddSampleTestCase = () => {
        setSampleTestCases([...sampleTestCases, { input: '', output: '' }]);
    };

    const handleSampleTestCaseChange = (index, type, value) => {
        const newTestCases = [...sampleTestCases];
        newTestCases[index][type] = value;
        setSampleTestCases(newTestCases);
    };

    const handleAddHiddenTestCase = () => {
        setHiddenTestCases([...hiddenTestCases, { input: '', output: '' }]);
    };

    const handleHiddenTestCaseChange = (index, type, value) => {
        const newTestCases = [...hiddenTestCases];
        newTestCases[index][type] = value;
        setHiddenTestCases(newTestCases);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            setError('You must be logged in');
            return;
        }

        const emptyFields = [];
        if (!title) emptyFields.push('title');
        if (!description) emptyFields.push('description');
        if (!difficulty) emptyFields.push('difficulty');
        sampleTestCases.forEach((testCase, index) => {
            if (!testCase.input) emptyFields.push(`sampleTestCaseInput-${index}`);
            if (!testCase.output) emptyFields.push(`sampleTestCaseOutput-${index}`);
        });
        hiddenTestCases.forEach((testCase, index) => {
            if (!testCase.input) emptyFields.push(`hiddenTestCaseInput-${index}`);
            if (!testCase.output) emptyFields.push(`hiddenTestCaseOutput-${index}`);
        });

        if (emptyFields.length > 0) {
            setEmptyFields(emptyFields);
            setError('Please fill in all the fields');
            return;
        }

        const problem = {
            title,
            description,
            difficulty,
            sampleTestCases,
            hiddenTestCases,
        };

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
            setSampleTestCases([{ input: '', output: '' }]);
            setHiddenTestCases([{ input: '', output: '' }]);
            setError(null);
            setEmptyFields([]);
            dispatch({ type: 'CREATE_PROBLEM', payload: json });
        }
    };

    return (
        <div className="container">
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

                <h4>Sample Test Cases</h4>
                {sampleTestCases.map((testCase, index) => (
                    <div key={index} className="test-case">
                        <label>Input:</label>
                        <input
                            type="text"
                            onChange={(e) => handleSampleTestCaseChange(index, 'input', e.target.value)}
                            value={testCase.input}
                            className={emptyFields.includes(`sampleTestCaseInput-${index}`) ? 'error-field' : ''}
                        />
                        <label>Output:</label>
                        <input
                            type="text"
                            onChange={(e) => handleSampleTestCaseChange(index, 'output', e.target.value)}
                            value={testCase.output}
                            className={emptyFields.includes(`sampleTestCaseOutput-${index}`) ? 'error-field' : ''}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddSampleTestCase}>Add Sample Test Case</button>

                <h4>Hidden Test Cases</h4>
                {hiddenTestCases.map((testCase, index) => (
                    <div key={index} className="test-case">
                        <label>Input:</label>
                        <input
                            type="text"
                            onChange={(e) => handleHiddenTestCaseChange(index, 'input', e.target.value)}
                            value={testCase.input}
                            className={emptyFields.includes(`hiddenTestCaseInput-${index}`) ? 'error-field' : ''}
                        />
                        <label>Output:</label>
                        <input
                            type="text"
                            onChange={(e) => handleHiddenTestCaseChange(index, 'output', e.target.value)}
                            value={testCase.output}
                            className={emptyFields.includes(`hiddenTestCaseOutput-${index}`) ? 'error-field' : ''}
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddHiddenTestCase}>Add Hidden Test Case</button>

                <button type="submit">Add Problem</button>
            </form>
        </div>    
    );
};

export default ProblemForm;

