import './styles/WeeklyPlan.css';
import PropTypes from 'prop-types';
// WeeklyPlan is a functional component that displays a weekly meal plan in the planner page.
// It takes three props: weeklyPlan (the meal plan for the week), 
// handleAddRecipe (a function to add a recipe), and handleRemoveRecipe (a function to remove a recipe).
function WeeklyPlan({ weeklyPlan, handleAddRecipe, handleRemoveRecipe }) {
    return (
        // The meal plan is displayed in a table within a div with class 'mainContent'.
        <div className="weekly-planner">
            <table>
                <thead>
                    <tr>
                        {/* // The table header contains four columns: 'Day', 'Breakfast', 'Lunch', and 'Dinner'. */}
                        <th>Day</th>
                        <th>Breakfast</th>
                        <th>Lunch</th>
                        <th>Dinner</th>
                    </tr>
                </thead>
                <tbody>
                    {/* // The table body contains a row for each day in the weekly plan.
                    // Object.entries(weeklyPlan) converts the weeklyPlan object into an array of [day, meals] pairs, which is then mapped to table rows. */}
                    {Object.entries(weeklyPlan).map(([day, meals]) => (
                        <tr key={day}>
                            {/* // The first cell in the row displays the day. */}
                            <td>{day}</td>
                            {/* The remaining cells in the row display the meals for the day.
                             Object.entries(meals) converts the meals object into an array of [meal, recipe] pairs, which is then mapped to table cells. */}
                            {Object.entries(meals).map(([meal, recipe]) => (
                                <td key={meal}>
                                    {/* // If a recipe is defined for the meal, it displays the recipe's label and a 'Remove' button.
                                    // When the 'Remove' button is clicked, handleRemoveRecipe is called with the day and the meal. */}
                                    {recipe ? (
                                        <div>
                                            <h3><a href={recipe.url} target="_blank" rel="noopener noreferrer">{recipe.label}</a></h3>
                                            <button onClick={() => handleRemoveRecipe(day, meal)}>Remove</button>
                                        </div>
                                    ) : (
                                        // If no recipe is defined for the meal, it displays an 'Add' button.
                                        // When the 'Add' button is clicked, handleAddRecipe is called with the day and the meal.
                                        /* <button onClick={() => handleAddRecipe(day, meal)}>Add</button> */
                                        <button onClick={() => handleAddRecipe()}>Add</button>
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
WeeklyPlan.propTypes = {
    weeklyPlan: PropTypes.objectOf(
        PropTypes.shape({
            breakfast: PropTypes.object,
            lunch: PropTypes.object,
            dinner: PropTypes.object
        })
    ).isRequired,
    handleAddRecipe: PropTypes.func.isRequired,
    handleRemoveRecipe: PropTypes.func.isRequired
};
export default WeeklyPlan;