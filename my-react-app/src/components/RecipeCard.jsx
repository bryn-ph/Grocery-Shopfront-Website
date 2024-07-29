import './styles/RecipeCard.css'
import PropTypes from 'prop-types';
// RecipeCard is a functional component that displays a recipe card.
// It takes three props: recipe (the recipe to display), handleRecipeClick (a function to handle clicking on the recipe), 
// and handleRecipeAddToPlannerClick (a function to handle adding the recipe to a planner).
function RecipeCard({ recipe, handleRecipeClick, handleRecipeAddToPlannerClick }) {
    return (
        // The recipe card is a div with class 'recipeCard'. The key prop is set to the recipe's id.
        // When the div is clicked, handleRecipeClick is called with the recipe.
        <div className="recipeCard" key={recipe.recipe.id} onClick={() => handleRecipeClick(recipe.recipe)}>
            <h2 className={recipe.recipe.label.length > 25 ? 'longTitle' : ''}>
                {recipe.recipe.label}
            </h2>
            <p>{Math.round(recipe.recipe.calories)} Calories</p>
            <img src={recipe.recipe.image} alt={recipe.recipe.label} />
            <button onClick={(event) => {
                // Prevent the click event from bubbling up to the parent div.
                event.stopPropagation();
                handleRecipeAddToPlannerClick(recipe.recipe, 'weekly');
            }}>Add to Weekly Planner</button>
            <button onClick={(event) => {
                // Prevent the click event from bubbling up to the parent div.
                event.stopPropagation();
                handleRecipeAddToPlannerClick(recipe.recipe, 'daily');
            }}>Add to Daily Planner</button>
        </div>
    );
}
RecipeCard.propTypes = {
    recipe: PropTypes.shape({
        recipe: PropTypes.shape({
            id: PropTypes.string,
            label: PropTypes.string,
            calories: PropTypes.number,
            image: PropTypes.string
        })
    }).isRequired,
    handleRecipeClick: PropTypes.func.isRequired,
    handleRecipeAddToPlannerClick: PropTypes.func.isRequired
};
export default RecipeCard;