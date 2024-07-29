import './styles/Modal.css';
import PropTypes from 'prop-types';

// Modal is a functional component that displays a modal with recipe details.
// It takes two props: recipe (the recipe to display) and setShowModal (a function to close the modal).
function Modal({ recipe, setShowModal }) {
    return (
        <div className="modalRecipe">

            <div className="modal-content">
                {/* The modal content displays the recipe's label, image, ingredients, and a link to the recipe's instructions. */}
                <div className="modal-leftSide">
                    <h2>{recipe.label}</h2>
                    <img src={recipe.image} alt={recipe.label} />
                </div>
                <div className='modal-rightSide'>
                    <h3>Ingredients:</h3>
                    <ul>
                        {recipe.ingredientLines.map((ingredient, index) => (
                            <li key={index}>{ingredient}</li>
                        ))}
                    </ul>
                    <br />
                    <h3>Instructions:</h3>
                    <a href={recipe.url} target="_blank">Go to recipe</a>
                </div>
                {/* The close button is a span with class "close". When clicked, it calls setShowModal with false to close the modal. */}
                <span className="close" onClick={() => setShowModal(false)}>&times;</span>
            </div>
        </div>
    );
}

// PropTypes are used to validate the props that the component receives.
Modal.propTypes = {
    recipe: PropTypes.shape({
        label: PropTypes.string,
        image: PropTypes.string,
        ingredientLines: PropTypes.arrayOf(PropTypes.string),
        url: PropTypes.string
    }).isRequired,
    setShowModal: PropTypes.func.isRequired
};


export default Modal;