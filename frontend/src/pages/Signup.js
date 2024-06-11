import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
//import '../styles/signup.css'; // Import the provided CSS file

const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    
    const { signup, isLoading, error } = useSignup()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await signup(email, password)
    }

    return (
        <div className="signup-container">
            <div className="screen">
                <div className="screen__content">
                    <form className='signup' onSubmit={handleSubmit}>
                        <h3>Sign up</h3>

                        <div className="signup__field">
                            <label>Email:</label>
                            <input 
                                className="signup__input"
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="signup__field">
                            <label>Password:</label>
                            <input 
                                className="signup__input"
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <button className="signup__submit" disabled={isLoading}>Sign up</button>
                        {error && <div className='error'>{error}</div>}
                    </form>
                </div>
                <div className="screen__background">
                    <div className="screen__background__shape screen__background__shape1"></div>
                    <div className="screen__background__shape screen__background__shape2"></div>
                    <div className="screen__background__shape screen__background__shape3"></div>
                    <div className="screen__background__shape screen__background__shape4"></div>
                </div>
            </div>
        </div>
    )
}

export default Signup