import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import api from "../api";

export const useSignup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useAuthContext();

    const signup = async (email, password) => {
        setIsLoading(true);
        setError(null);

        try {
            const response = await api.post('/api/user/signup', { email, password });

            if (response.status === 200) {
                const json = response.data;

                // Save the user to local storage
                localStorage.setItem('user', JSON.stringify(json));

                // Update the auth context
                dispatch({ type: 'LOGIN', payload: json });

                setIsLoading(false);
            } else {
                setError('Failed to sign up');
                setIsLoading(false);
            }
        } catch (error) {
            console.error('Error signing up:', error);
            setError('Failed to sign up');
            setIsLoading(false);
        }
    };

    return { signup, isLoading, error };
};