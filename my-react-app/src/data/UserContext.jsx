// This file is used to create a context object that will be used to pass the user data to the components.
// For right now its just used to pass the loggedIn Value
// learnt from https://www.youtube.com/watch?v=lhMKvyLRWo0&list=LL&index=1&t=531s
import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

const UserContext = createContext();

export function UserProvider({ children }) {
    const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');

    return (
        <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </UserContext.Provider>
    );
}
UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export default UserContext;