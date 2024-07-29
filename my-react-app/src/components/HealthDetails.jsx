import { useState } from 'react';
import PropTypes from 'prop-types';
import EditableField from './EditableField';
import { isValidHeight, isValidWeight } from '../data/Validation';
import './styles/HealthDetails.css';
// HealthDetails is a functional component that displays health details of a user.
// It allows the user to edit their weight, height, gender and other health-related information.
function HealthDetails({ user, saveUserDetailsBackToUserList, setNotification, setNotificationKey }) {
    const [weight, setWeight] = useState(user.weight || '');
    const [height, setHeight] = useState(user.height || '');
    const [gender, setGender] = useState(user.gender || '');
    const [activityLevel, setActivityLevel] = useState(user.activityLevel || '');
    const [dietaryPreferences, setDietaryPreferences] = useState(user.dietaryPreferences || '');
    const [healthGoals, setHealthGoals] = useState(user.healthGoals || '');

    // SAVING FUNCTIONS FOR UPDATING USER DETAILS
    const handleWeightSave = (newWeight) => {
        setWeight(newWeight);
        user.weight = newWeight + ' kg';
        localStorage.setItem('user', JSON.stringify(user));
        saveUserDetailsBackToUserList(user);
        setNotificationKey(prevKey => prevKey + 1);
        setNotification('Weight updated successfully');
    };

    const handleHeightSave = (newHeight) => {
        setHeight(newHeight);
        user.height = newHeight + ' cm';
        localStorage.setItem('user', JSON.stringify(user));
        saveUserDetailsBackToUserList(user);
        setNotificationKey(prevKey => prevKey + 1);
        setNotification('Height updated successfully');
    };


    const handleGenderSave = (newGender) => {
        setGender(newGender);
        // Save the new gender back to the user object and local storage
        user.gender = newGender;
        localStorage.setItem('user', JSON.stringify(user));
        saveUserDetailsBackToUserList(user);
        setNotificationKey(prevKey => prevKey + 1);
        setNotification('Gender updated successfully')
    };

    const handleActivityLevelSave = (newActivityLevel) => {
        setActivityLevel(newActivityLevel);
        user.activityLevel = newActivityLevel;
        localStorage.setItem('user', JSON.stringify(user));
        saveUserDetailsBackToUserList(user);
        setNotificationKey(prevKey => prevKey + 1);
        setNotification('Activity level updated successfully');
    };

    const handleDietaryPreferencesSave = (newDietaryPreferences) => {
        setDietaryPreferences(newDietaryPreferences);
        user.dietaryPreferences = newDietaryPreferences;
        localStorage.setItem('user', JSON.stringify(user));
        saveUserDetailsBackToUserList(user);
        setNotificationKey(prevKey => prevKey + 1);
        setNotification('Dietary preferences updated successfully');
    };

    const handleHealthGoalsSave = (newHealthGoals) => {
        setHealthGoals(newHealthGoals);
        user.healthGoals = newHealthGoals;
        localStorage.setItem('user', JSON.stringify(user));
        saveUserDetailsBackToUserList(user);
        setNotificationKey(prevKey => prevKey + 1);
        setNotification('Health goals updated successfully');
    };
    const validateWeight = (weight) => {
        // Check if the weight is valid
        if (!isValidWeight(weight)) {
            return 'Please enter a valid weight in kg.';
        }
        return null;
    }
    const validateHeight = (height) => {
        // Check if the height is valid
        if (!isValidHeight(height)) {
            return 'Please enter a valid height in cm.';
        }
        return null;
    }
    const validateOption = (option) => {
        return option == '';
    };

    return (
        <div className='tabContent'>
            <div className='sectionContent'>
                <h2 className='sectionTitleField'>Health Details</h2>

                <EditableField label="Weight" initialValue={weight} onSave={handleWeightSave} hint={'Enter your weight (kg)'} validation={validateWeight} unit=" kg" shouldAppendUnit={true} />
                <EditableField label="Height" initialValue={height} onSave={handleHeightSave} hint={'Enter your height (cm)'} validation={validateHeight} unit=" cm" shouldAppendUnit={true} />
                <EditableField
                    label="Gender"
                    initialValue={gender || ''}
                    onSave={handleGenderSave}
                    hint={'Select your gender'}
                    options={['', 'Male', 'Female']}
                    shouldAppendUnit={false}
                    validation={validateOption}
                />
                <EditableField label="Activity Level" initialValue={activityLevel || ''} onSave={handleActivityLevelSave} hint={'Select your activity level'} options={['', 'Low', 'Medium', 'High']} shouldAppendUnit={false} validation={validateOption} />
                <div style={{ marginBottom: '80px' }}> {/* Add a bottom margin */}
                    <EditableField
                        label="Dietary Preferences"
                        initialValue={dietaryPreferences}
                        onSave={handleDietaryPreferencesSave}
                        hint={'Select your dietary preferences'}
                        options={['Gluten Free', 'Dairy Free', 'Egg Free', 'Nut Free', 'Vegan', 'Vegetarian']}
                        shouldAppendUnit={false}
                        isMultiSelect={true}
                    />
                </div>
                <EditableField label="Health Goals" initialValue={healthGoals} onSave={handleHealthGoalsSave} hint={'Enter your health goals'} shouldAppendUnit={false} />

            </div>
        </div>
    );

}

HealthDetails.propTypes = {
    user: PropTypes.object.isRequired,
    saveUserDetailsBackToUserList: PropTypes.func.isRequired,
    setNotification: PropTypes.func.isRequired,
    setNotificationKey: PropTypes.func.isRequired
};

export default HealthDetails;