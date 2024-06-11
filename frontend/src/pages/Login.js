import { useState } from 'react'
import { useLogin } from '../hooks/useLogin'


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('user');
    const {login, error, isLoading} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()

        await login(email, password, role)
    }

    return (
        <div className="login-container">
            <div className="screen">
                <div className="screen__content">
                    <form className='login' onSubmit={handleSubmit}>
                        <h3>Login</h3>

                        <div className="login__field">
                            <label>Email:</label>
                            <input 
                                className="login__input"
                                type='email'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                            />
                        </div>
                        <div className="login__field">
                            <label>Password:</label>
                            <input 
                                className="login__input"
                                type='password'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                            />
                        </div>
                        <div className="login__field">
                            <label>Role:</label>
                            <select
                                className="login__input"
                                onChange={(e) => setRole(e.target.value)}
                                value={role}
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <button className="login__submit" disabled={isLoading}>Login</button>
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

export default Login