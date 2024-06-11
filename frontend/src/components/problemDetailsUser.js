import React from 'react';
import { useProblemsContext } from '../hooks/useProblemsContext';
import{ useAuthContext} from "../hooks/useAuthContext";
import { useNavigate } from 'react-router-dom';


const ProblemDetailsUser = ({ problem }) => {
    const { dispatch } = useProblemsContext()
    const { user } = useAuthContext()
    const navigate = useNavigate();
    

    const handleSolveClick = () => {
        navigate(`/${problem._id}`);
    };

    return (
        <div className="container">
            <div className="problem-details">
                <h2>{problem.title}</h2>
                    <p><strong>Description:</strong> {problem.description}</p>
                    <p><strong>Difficulty:</strong> {problem.difficulty}</p>
                    <h3>Sample Test Cases</h3>
                    {problem.sampleTestCases && problem.sampleTestCases.length > 0 ? (
                        <ul>
                            {problem.sampleTestCases.map((testCase, index) => (
                                <li key={index}>
                                    <p><strong>Input:</strong> {testCase.input}</p>
                                    <p><strong>Output:</strong> {testCase.output}</p>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No test cases available.</p>
                    )}
                
                <button className='material-symbols-outlined' onClick={handleSolveClick}>solve</button>
            </div>
        </div>    
    );
};

export default ProblemDetailsUser;
