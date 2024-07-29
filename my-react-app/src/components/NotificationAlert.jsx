import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// This is our implementation of a notification alert that can appear on nearly every page of the application.
// The notification alert will display a message for a few seconds and then disappear.
// It is currently used for when a user logs in or logs out, or when they update their health details.
function Notification({ message }) {
    const [show, setShow] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShow(false);
        }, 3000); // Hide after 3 seconds
        return () => clearTimeout(timer);
    }, [message]);

    if (!show) return null;

    return (
        <div className='notificationMessage'>
            {message}
        </div>
    );
}

Notification.propTypes = {
    message: PropTypes.string.isRequired,
};

export default Notification;