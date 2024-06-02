import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const Solve = () => {
    const { id } = useParams();
    const { user } = useAuthContext();
    const [problem, setProblem] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [code, setCode] = useState(localStorage.getItem(`code-${id}`) || '');
    const [input, setInput] = useState(localStorage.getItem(`input-${id}`) || '');
    const [output, setOutput] = useState('');
    const [language, setLanguage] = useState('cpp'); 

    useEffect(() => {
        const fetchProblem = async () => {
            if (!user) {
                setError('You must be logged in to view this problem.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`/api/problems/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch the problem.');
                }

                const data = await response.json();
                setProblem(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProblem();
    }, [id, user]);

    useEffect(() => {
        localStorage.setItem(`code-${id}`, code);
    }, [code, id]);

    useEffect(() => {
        localStorage.setItem(`input-${id}`, input);
    }, [input, id]);

    const handleRunCode = async () => {
        setOutput('');

        try {
            const response = await fetch(`/api/problems/${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`
                },
                body: JSON.stringify({ language, code, input })
            });

            const data = await response.json();

            if (response.ok) {
                setOutput(data.output);
            } else {
                setOutput(`Error: ${data.error}`);
            }
        } catch (error) {
            setOutput(`Error: ${error.message}`);
        }
    };

    const handleSubmitCode = () => {
        // Logic to submit the code (similar to handleRunCode)
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="solve-container">
            <div className="code-editor">
                <h2>Code Editor</h2>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                >
                    <option value="cpp">C++</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                </select>
                <textarea
                    className="code-area"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                ></textarea>
                <div className="io-container">
                    <div className="input-area">
                        <h3>Input</h3>
                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="output-area">
                        <h3>Output</h3>
                        <textarea
                            readOnly
                            value={output}
                        ></textarea>
                    </div>
                </div>
                <div className="buttons">
                    <button onClick={handleRunCode}>Run Code</button>
                    <button onClick={handleSubmitCode}>Submit Code</button>
                </div>
            </div>
            <div className="problem-details-code">
                <h2>{problem.title}</h2>
                <p><strong>Description:</strong> {problem.description}</p>
                <p><strong>Difficulty:</strong> {problem.difficulty}</p>
                <h3>Test Cases</h3>
                {problem.testCases && problem.testCases.length > 0 ? (
                    <ul>
                        {problem.testCases.map((testCase, index) => (
                            <li key={index}>
                                <p><strong>Input:</strong> {testCase.input}</p>
                                <p><strong>Output:</strong> {testCase.output}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No test cases available.</p>
                )}
            </div>
        </div>
    );
};

export default Solve;
