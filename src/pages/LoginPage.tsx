import { useState, type FC, type FormEvent } from 'react';
import { loginUser } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage: FC = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const user = await loginUser(email, password);
            if (user) {
                // use context instead of local storage so PrivateRoute works correctly
                login(user);
                navigate('/hierarchy');
            } else {
                setError('Invalid email or password');
            }
        } catch (error) {
            setError('An error occurred during login');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page-wrapper">
            <h2 className="login-title">Please log in</h2> 
            <div className="login-form-container">
                <form onSubmit={handleSubmit} className="login-form">
                    <div className='form-row'>
                        <label htmlFor="email">email address:</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            value={email}
                            autoComplete='off' 
                            onChange={(e) => setEmail(e.target.value.trim())} 
                            required 
                        />
                    </div>
                    <div className='form-row'>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            id="password" 
                            name="password" 
                            value={password}
                            autoComplete='off' 
                            onChange={(e) => setPassword(e.target.value)} 
                            required 
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <button className="login-button" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log In'}</button>
                </form>
            </div>
        </div>
    )
};

export default LoginPage