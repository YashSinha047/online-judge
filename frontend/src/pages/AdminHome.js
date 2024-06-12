import { useEffect } from "react";
import { useProblemsContext } from "../hooks/useProblemsContext";
import { useAuthContext } from "../hooks/useAuthContext";
import api from "../api";

// components
import ProblemDetailsAdmin from '../components/problemDetailsAdmin';
import ProblemForm from "../components/ProblemForm";

const AdminHome = () => {
    const { problems, dispatch } = useProblemsContext();
    const { user } = useAuthContext();

    useEffect(() => {
        const fetchProblems = async () => {
            try {
                const response = await api.get('/api/problems', {
                    headers: {
                        'Authorization': `Bearer ${user.token}`
                    }
                });
                const problemsData = response.data;

                if (response.status === 200) {
                    dispatch({ type: 'SET_PROBLEMS', payload: problemsData });
                } else {
                    console.error('Failed to fetch problems:', problemsData.error);
                }
            } catch (error) {
                console.error('Failed to fetch problems:', error);
            }
        };

        if (user) {
            fetchProblems();
        }
    }, [dispatch, user]);

    return (
        <div className="home">
            <div className="problems">
                {problems && problems.map((problem) => (
                    <ProblemDetailsAdmin key={problem._id} problem={problem}/>
                ))}
            </div>
            <ProblemForm/>
        </div>
    );
};

export default AdminHome;
