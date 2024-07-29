import { useState, useEffect, useContext } from 'react';
import './styles/SignUp.css';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import UserContext from '../data/UserContext';
import { isValidEmail, isValidDob } from '../data/Validation';
import InputMask from 'react-input-mask';

function SignUp({ setNotification, setNotificationKey }) {

    const navigate = useNavigate();
    const { setLoggedIn } = useContext(UserContext);

    // Declare state variables for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordsMatch, setPasswordsMatch] = useState(true);

    // Declare state variables for first name, last name, and dob
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');

    useEffect(() => {
        setPasswordsMatch(password === confirmPassword);
    }, [password, confirmPassword]);

    // Allows for switching password between visible and hidden
    const [showPassword, setShowPassword] = useState(false);

    // Declare state variables for error messages
    const [errorMessage, setErrorMessage] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [emailError, setEmailError] = useState(null);
    const [dobError, setDobError] = useState(null);


    // Checks if password conditions are met
    const [hasEightChars, setHasEightChars] = useState(false);
    const [hasUppercase, setHasUppercase] = useState(false);
    const [hasLowercase, setHasLowercase] = useState(false);
    const [hasNumber, setHasNumber] = useState(false);
    const [hasSymbol, setHasSymbol] = useState(false);

    function register(email, password) {


        // Get the current users from local storage
        let users = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the user already exists
        if (users.some(user => user.email === email)) {
            // console.log('User Already exists');
            setNotification(`User already exists, Please login instead if this is you.\n
            Otherwise, please choose a different email address`);
            setNotificationKey(prevKey => prevKey + 1);
            // throw new Error(`User already exists, Please login instead if this is you.\n
            // Otherwise, please choose a different username`);
            // stops the function from running
            return;
        }
        //NEEDED FOR ACCOUNT CREATION DATE IN PROFILE
        // Get current date
        const currentDate = new Date();

        // Extract day, month, and year
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = currentDate.getFullYear();

        // Format date as dd/mm/yyyy
        const joinDate = `${day}/${month}/${year}`;


        // Add the new user to the array
        users.push({ email, password, joinDate, firstName, lastName, dob });
        // Save the updated array back to local storage
        localStorage.setItem('users', JSON.stringify(users));
        // Store the user object in local storage
        const user = { email, password, joinDate, firstName, lastName, dob };
        // Set the notification message to inform the user that their account has been created
        setNotification('Account created successfully');
        setNotificationKey(prevKey => prevKey + 1);

        // Store the user object in local storage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('loggedIn', true);
        setLoggedIn(true);
        // Navigate to the home page
        navigate('/');

    }

    function handleSubmit(event) {
        event.preventDefault();
        setNotification(null); // Reset the notification state
        // Reset all error messages
        setPasswordError(null);
        setEmailError(null);
        setDobError(null);
        setErrorMessage(null);

        // If passwords don't match, set an error message and return early
        if (!passwordsMatch) {
            setPasswordError('Passwords do not match');
            setErrorMessage('Passwords do not match');
            return;
        }
        try {
            if (!validatePassword(password)) {
                setPasswordError('Password does not meet the requirements');
                setErrorMessage('Password does not meet the requirements');
                // console.log('User Not registered');
            }
            else if (!isValidEmail(email)) {
                setEmailError('Please enter a valid email');
                setErrorMessage('Please enter a valid email');
                // console.log('User Not registered');
            }
            else if (!isValidDob(dob)) {
                setDobError('Please enter a valid date of birth');
                // console.log('User Not registered');
            }
            else {

                register(email, password);
                
                // clears old error messages
                setPasswordError(null);
                setEmailError(null);
                setDobError(null);
                setErrorMessage(null);
                // console.log('User registered');
            }


            // To Verify that the user has been registered
            // console.log(localStorage.getItem('users'));
            // or
            // inspect the page, go to application tab, then storage, then local storage
            // then you can see the users that have been registered


            // Redirect to login page

            // You can use the useHistory hook to do this
            // history.push('/login');
        } catch (error) {
            console.error(error);
            setNotification(error.message);
        }

    }

    // A function to validate the password using regex/ regular expressions
    function validatePassword(password) {
        // At least 8 characters
        if (password.length < 8) {
            return false;
        }
        // Each checks to see if the password contains the following
        // At least 1 uppercase letter
        if (!/[A-Z]/.test(password)) {
            return false;
        }

        // At least 1 lowercase letter
        if (!/[a-z]/.test(password)) {
            return false;
        }

        // At least 1 number
        if (!/[0-9]/.test(password)) {
            return false;
        }

        // At least 1 symbol
        if (!/[.,;:!?@#$%^&*_+=-]/.test(password)) {
            return false;
        }

        // If all checks pass, return true
        return true;
    }

    function handlePasswordChange(e) {
        const password = e.target.value;
        setPassword(password);

        // Check if password meets the conditions
        setHasEightChars(password.length >= 8);
        setHasUppercase(/[A-Z]/.test(password));
        setHasLowercase(/[a-z]/.test(password));
        setHasNumber(/[0-9]/.test(password));
        setHasSymbol(/[.,;:!?@#$%^&*_+=-]/.test(password));
    }

    return (
        <div>

            <h1 id='title'>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label id='email'>
                    Email Address:
                    <input type="text" value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter Email' required />
                </label>
                {emailError && <p className="error">{emailError}</p>}
                <label id='password'>
                    Password:
                    <input type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} placeholder='Enter Password' required />
                    <button type="button" onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? 'Hide Password' : 'Show Password'}
                    </button>
                </label>
                {/* {errorMessage && <p className="error">{errorMessage}</p>} */}
                {passwordError && <p className="error">{passwordError}</p>}
                <br />
                <p>Password must meet the following requirements:</p>
                <ol>
                    <li className={hasEightChars ? 'greenText' : 'redText'}>
                        Ensure that password contains at least 8 characters.
                    </li>
                    <li className={hasUppercase ? 'greenText' : 'redText'}>
                        Must contain at least 1 uppercase letter.
                    </li>
                    <li className={hasLowercase && hasNumber ? 'greenText' : 'redText'}>
                        Must contain at least 1 lowercase letter, and 1 number.
                    </li>
                    <li className={hasSymbol ? 'greenText' : 'redText'}>
                        Must contain at least 1 symbol (.,;:!?@#$%^&*_+-=).
                    </li>
                </ol>
                <br />
                <label id='confirmPassword'>
                    Confirm Password:
                    <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder='Enter Password' required />
                </label>

                {!passwordsMatch && <p>Passwords do not match!</p>}
                <br />
                <p>
                    Already have an account? <a onClick={() => navigate('/login')}>Login</a>
                </p>
                <br />
                <h2>Personal Details</h2>

                <label>
                    First Name:
                    <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='Enter First Name' required />
                </label>
                <label>
                    Last Name:
                    <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Enter Last Name' required />
                </label>
                
                <label className="label-dob">
                    Date of Birth:
                    <InputMask 
                            mask="99/99/9999" 
                            value={dob} 
                            onChange={e => setDob(e.target.value)}  
                            placeholder='dd/mm/yyyy' 
                            required 
                        />
                </label>
                {dobError && <p className="error">{dobError}</p>}

                <br />
                {/* General Error */}
                {errorMessage && <p className="error">{errorMessage}</p>}
                <p>
                    By signing up, you agree to our Terms, Data Policy and Cookies Policy.
                </p>
                <br />
                <button className='submitButton' type="submit">Sign Up</button>
                <br />
                {/* Notification message for when login in/signing up */}
                {/* {notification && <Notification key={notificationKey} message={notification} />} */}
            </form>
            
        </div>
    );
}
SignUp.propTypes = {
    setNotification: PropTypes.func.isRequired,
    setNotificationKey: PropTypes.func.isRequired
};

export default SignUp;