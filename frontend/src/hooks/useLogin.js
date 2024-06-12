import { useState } from "react";
import { useAuthContext } from './useAuthContext'
import api from "../api";

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const { dispatch } = useAuthContext()

    const login = async (email, password, role) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await api.post('/api/user/login', {
                email,
                password,
                role
            }, {
                headers: {'Content-Type': 'application/json'}
            });

            const json = response.data;

            if (response.status === 200) {
                // Save the user to local storage
                localStorage.setItem('user', JSON.stringify(json))

                // Update the auth context
                dispatch({type: 'LOGIN', payload: json})
            } else {
                setError(json.error)
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Login failed. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    return { login, isLoading, error }
}
