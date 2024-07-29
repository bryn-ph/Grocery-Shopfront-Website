// File for containing validation functions for the application
// Import using the following syntax:
// import { functionName, functionName, functionName } from './data/Validation';


export function isEmailRegistered(email) {
    // Check if the username is already registered
    // Get the current users from local storage
    let users = JSON.parse(localStorage.getItem('users')) || [];
    let currentUser = JSON.parse(localStorage.getItem('user'));
    if (users.find(user => user.email === email)) {
        // If the username is already registered, check if it is the current user
        if (currentUser.email === email) {
            // If the username is the current user, return false
            return false;
        }
        return true;
    }
    return false;


}

export function isValidEmail(email) {
    // Check if the email is valid
    // A simple regex check for the email found online: 
    // https://piyush132000.medium.com/mastering-email-validation-in-javascript-multiple-approaches-ae718546160b#:~:text=Method%201%3A%20Using%20Regular%20Expressions&text=%2D%20%60%2F%5E%5Ba%2DzA,matches%20most%20standard%20email%20addresses.
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}
export function isValidPassword(password) {
    // Check if the password is valid
    // The password should be at least 8 characters long
    // The password should contain at least one number
    // The password should contain at least one special character
    // The password should contain at least one uppercase letter
    // The password should contain at least one lowercase letter
    if (password.length < 8) {
        return 'Password must be at least 8 characters long.';
    }
    if (!/[a-z]/.test(password)) {
        return 'Password must contain at least one lowercase letter.';
    }
    if (!/[A-Z]/.test(password)) {
        return 'Password must contain at least one uppercase letter.';
    }
    if (!/[0-9]/.test(password)) {
        return 'Password must contain at least one number.';
    }
    if (!/[.,;:!?@#$%^&*_+=-]/.test(password)) {
        return 'Password must contain at least one special character.';
    }
    return null;
}
export function isValidDob(dob) {
    // Check if the date of birth is valid
    // A simple regex check for the date of birth
    // The date of birth should be in the format of DD/MM/YYYY
    // The date of birth should be before the current date
    // The date of birth should be after 01/01/1900
    // The date of birth should be before current date

    // Regular expression for date format DD/MM/YYYY
    const regex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/;

    // Check if the date of birth matches the format
    if (!regex.test(dob)) {
        return false;
    }

    // Convert the date of birth to a Date object
    const [day, month, year] = dob.split("/");
    const dobDate = new Date(year, month - 1, day);

    // Check if the date of birth is before the current date and after 01/01/1900
    const minDate = new Date(1900, 0, 1);
    const currentDate = new Date();

    return dobDate > minDate && dobDate < currentDate;
}
export function isValidWeight(weight) {
    // Check if the weight is valid
    // The weight should be a number
    // The weight should be between 0 and 500
    return !isNaN(weight) && weight >= 0 && weight <= 500;
}
export function isValidHeight(height) {
    // Check if the height is valid
    // The height should be a number
    // The height should be between 0 and 300
    return !isNaN(height) && height >= 0 && height <= 300;
}
export function isValidName(name) {
    // Check if the name is valid
    // The name should not be empty
    // The name should not contain any numbers
    // The name should not contain any special characters
    // The name should not contain any whitespace
    return name.length > 0 && !/\d/.test(name) && !/[!@#$%^&*(),.?":{}|<>]/g.test(name) && !/\s/.test(name);
}
