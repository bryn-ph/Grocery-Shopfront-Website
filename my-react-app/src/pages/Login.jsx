import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from "../data/UserContext";
import './styles/Login.css';

function Login({ setNotification, setNotificationKey }) {
    const navigate = useNavigate();
    // gets and sets loggedIn from UserContext/Provider/App.jsx
    const { setLoggedIn } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        // Get the current users from local storage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the user exists and the password is correct
        const user = users.find(user => user.email === email && user.password === password);
        if (user) {
            // loginUser(username);
            setNotification('Logged in successfully as ' + user.firstName);
            setNotificationKey(prevKey => prevKey + 1);

            // Store the user object in local storage
            // localStorage.setItem('user', JSON.stringify(user));
            // Testing storage abilities
            // user.age = 30;
            // user.weight = 150;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('loggedIn', true);
            setLoggedIn(true);
            // Navigate to the home page
            navigate('/');
        } else {
            setNotification('email or password is incorrect. Please try again.');
            setNotificationKey(prevKey => prevKey + 1);
        }
    }

    return (
        <div>
            <h1 id='title'>Login</h1>
            <br />
            <form onSubmit={handleSubmit}>

                <label>
                    Email:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter Email' required />
                </label>
                <label>
                    Password:
                    <input type={showPassword ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} placeholder='Enter Password' required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                </label>
                <br />
                <button type="submit">Login</button>
                <br />
                <p>
                    New to SOIL? <a onClick={() => navigate('/SignUp')}>Sign Up Here</a>
                </p>
            </form>
        </div>
    );
}

Login.propTypes = {
    setNotification: PropTypes.func.isRequired,
    setNotificationKey: PropTypes.func.isRequired
};

export default Login;