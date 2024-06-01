import { useEffect } from "react";
import { useProblemsContext } from "../hooks/useProblemsContext";
import { useAuthContext } from "../hooks/useAuthContext"

// components
import ProblemDetails from '../components/problemDetails';
import ProblemForm from "../components/ProblemForm";

const Home = () => {

    const { problems, dispatch } = useProblemsContext()
    const { user } = useAuthContext()

    useEffect(() => {

        const fetchProblems = async () => {
            const response = await fetch('/api/problems', {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            const json = await response.json()

            if(response.ok){
                dispatch({type: 'SET_PROBLEMS', payload: json})
            }
        }

        if(user) {
            fetchProblems()
        }
        
    }, [dispatch, user])

    return (
        <div className="home">
            <div className="problems">
            {problems && problems.map((problem) => (
                <ProblemDetails key={problem._id} problem={problem}/>
            ))}
            </div>
            <ProblemForm/>
        </div>
        
    );
}
 
export default Home;