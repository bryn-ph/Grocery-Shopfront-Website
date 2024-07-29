import '../pages/styles/Planner.css';
import PropTypes from 'prop-types';
// RecipeSelectionModal is a functional component that displays a modal for selecting a recipe.
// It takes three props: recipes (the list of recipes to display), handleSelectRecipe (a function to handle selecting a recipe), and setShowRecipeSelectionModal (a function to close the modal).
function RecipeSelectionModal({ recipes, handleSelectRecipe, setShowRecipeSelectionModal }) {
    return (
        <div className="modal">
            <div className="modal-content">
                {/* The close button is a span with class "close". When clicked, it calls setShowRecipeSelectionModal with false to close the modal. */}
                <span className="close" onClick={() => setShowRecipeSelectionModal(false)}>&times;</span>
                {/* // The recipes are displayed in divs. Each div has a key prop set to the recipe's id.
                // When a div is clicked, handleSelectRecipe is called with the recipe. */}
                {recipes.map((recipe) => (
                    <div key={recipe.recipe.id} onClick={() => handleSelectRecipe(recipe.recipe)}>
                        <h3>{recipe.recipe.label}</h3>
                        <img src={recipe.recipe.image} alt={recipe.recipe.label} />
                    </div>
                ))}
            </div>
        </div>
    );
}
RecipeSelectionModal.propTypes = {
    recipes: PropTypes.arrayOf(
        PropTypes.shape({
            recipe: PropTypes.shape({
                id: PropTypes.string,
                label: PropTypes.string,
                image: PropTypes.string
            })
        })
    ).isRequired,
    handleSelectRecipe: PropTypes.func.isRequired,
    setShowRecipeSelectionModal: PropTypes.func.isRequired
};
export default RecipeSelectionModal;