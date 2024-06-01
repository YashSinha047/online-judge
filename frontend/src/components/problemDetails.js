import React from 'react';
import { useProblemsContext } from '../hooks/useProblemsContext';
import{ useAuthContext} from "../hooks/useAuthContext";


const ProblemDetails = ({ problem }) => {
    const { dispatch } = useProblemsContext()
    const { user } = useAuthContext()
    

    const handleClick = async () => {
        if(!user){
            return 
        } 
        const response = await fetch('/api/problems/' + problem._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if(response.ok){
            dispatch({type: 'DELETE_PROBLEM', payload: json})
        }
    }

    return (
        <div className="problem-details">
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
            <button  className='material-symbols-outlined' onClick={handleClick}>delete</button>
            
        </div>
    );
};

export default ProblemDetails;
