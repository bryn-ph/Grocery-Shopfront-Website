import './styles/DailyPlan.css';
import PropTypes from 'prop-types';
// DailyPlan is a functional component that displays a daily meal plan.
// It takes three props: dailyPlan (the meal plan for the day), handleAddRecipe (a function to add a recipe), and handleRemoveRecipe (a function to remove a recipe).
function DailyPlan({ dailyPlan, handleAddRecipe, handleRemoveRecipe }) {
    return (
        // The meal plan is displayed in a table within a div with class 'mainContent'.
        <div className='daily-planner'>
            <table>
                <thead>
                    <tr>
                        {/* The table header contains two columns: 'Meal Time' and 'Recipe'. */}
                        <th>Meal Time</th>
                        <th>Recipe</th>
                    </tr>
                </thead>
                <tbody>
                    {/* The table body contains a row for each meal time in the daily plan.
                    Object.entries(dailyPlan) converts the dailyPlan object into an array of [mealTime, recipe] pairs, which is then mapped to table rows. */}
                    {Object.entries(dailyPlan).map(([mealTime, recipe]) => (
                        <tr key={mealTime}>
                            <td>{mealTime}</td>
                            <td>
                                {/* The second cell in the row displays the recipe for the meal time.
                                If a recipe is defined for the meal time, it displays the recipe's label and a 'Remove' button.
                                When the 'Remove' button is clicked, handleRemoveRecipe is called with null (indicating no specific day) and the meal time. */}
                                {recipe ? (
                                    <div>
                                        <h3><a href={recipe.url} target="_blank" rel="noopener noreferrer">{recipe.label}</a></h3>
                                        <button onClick={() => handleRemoveRecipe(null, mealTime)}>Remove</button>
                                    </div>
                                ) : (
                                    // If no recipe is defined for the meal time, it displays an 'Add' button.
                                    // When the 'Add' button is clicked, handleAddRecipe is called with null (indicating no specific day) and the meal time.
                                    /* <button onClick={() => handleAddRecipe(null, mealTime)}>Add</button> */
                                    <button onClick={() => handleAddRecipe()}>Add</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
DailyPlan.propTypes = {
    dailyPlan: PropTypes.objectOf(PropTypes.object).isRequired,
    handleAddRecipe: PropTypes.func.isRequired,
    handleRemoveRecipe: PropTypes.func.isRequired
};

export default DailyPlan;