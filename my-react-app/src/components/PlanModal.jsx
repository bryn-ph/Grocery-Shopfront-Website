import '../pages/styles/Planner.css';
import './styles/PlanModal.css';
import PropTypes from 'prop-types';
import { useState } from 'react';
// PlanModal is a component that displays a modal for selecting a day and meal time to add a recipe to.
// It takes several props: plan (the current meal plan), handleSelect (a function to handle selecting a recipe),
// recipe (the selected recipe), handleClose (a function to close the modal), and planner (the type of planner, either 'daily' or 'weekly').
function PlanModal({ plan, handleSelect, recipe, handleClose, planner }) {
    // selectedDay is a state variable that holds the selected day. It is initially null.
    const [selectedDay, setSelectedDay] = useState(null);

    // If plan is not defined, return null to prevent rendering.
    if (!plan) {
        return null; // or some loading indicator
    }

    // The component returns a modal with different content depending on whether planner is 'daily' or 'weekly'.
    return (
        <div className="modal">
            <div className="modalContent">
                {/* Button that closes the modal */}
                <span className="close" onClick={handleClose}>&times;</span>
                {planner === 'weekly' && (
                    <div>
                        <label>Select a day:</label>
                        {/* When a day is selected, setSelectedDay is called with the selected day. */}
                        <select onChange={e => setSelectedDay(e.target.value)}>
                            <option value="">--Please choose an option--</option>
                            {/* The options for the select element are the keys of the plan object (the days). */}
                            {Object.keys(plan).map(day => (
                                <option key={day} value={day}>{day}</option>
                            ))}
                        </select>
                    </div>
                )}
                {planner === 'weekly' && selectedDay && (
                    <div className="grid">
                        {/* If planner is 'weekly' and a day is selected, display a grid of meal times for the selected day. */}
                        {Object.entries(plan[selectedDay]).map(([time, meal]) => (
                            <div key={time} className="grid-item">
                                <h2>{time}</h2>
                                {/* When the button is clicked, handleSelect is called with the time, recipe, and selected day. */}
                                <button onClick={() => handleSelect(time, recipe, selectedDay)}>
                                    {/* If a meal is already planned for this time, display its label. Otherwise, display 'Add Recipe'. */}
                                    {meal ? meal.label : 'Add Recipe'}
                                </button>
                            </div>
                        ))}
                    </div>
                )}
                {planner === 'daily' && (
                    <div>
                        <label>Select a meal time: </label>
                        <div className="grid">
                            {/* If planner is 'daily', display a grid of meal times for the day. */}
                            {Object.entries(plan).map(([time, meal]) => (
                                <div key={time} className="grid-item">
                                    <h2>{time}</h2>
                                    {/* When the button is clicked, handleSelect is called with the time and recipe. */}
                                    <button onClick={() => handleSelect(time, recipe)}>
                                        {/* If a meal is already planned for this time, display its label. Otherwise, display 'Add Recipe'. */}
                                        {meal ? meal.label : 'Add Recipe'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

        </div>
    );
}

// PropTypes are used to validate the props that the component receives.
PlanModal.propTypes = {
    plan: PropTypes.object.isRequired,
    handleSelect: PropTypes.func.isRequired,
    recipe: PropTypes.object.isRequired,
    handleClose: PropTypes.func.isRequired,
    planner: PropTypes.string.isRequired
};

export default PlanModal;