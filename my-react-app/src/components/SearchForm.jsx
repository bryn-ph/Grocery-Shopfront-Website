import '../pages/styles/Planner.css';
import PropTypes from 'prop-types';
// SearchForm is a functional component that displays a search form. Currently only set up and used for the food api
// It takes several props: search (the search query), setSearch (a function to update the search query),
// health (the health filters), setHealth (a function to update the health filters),
// dietary (the dietary filters), setDietary (a function to update the dietary filters),
// and handleSubmit (a function to handle form submission).
function SearchForm({ search, setSearch, health, setHealth, dietary, setDietary, handleSubmit, minCalories, maxCalories, setMinCalories, setMaxCalories }) {
    // handleDietaryChange is a function that updates the dietary filters when a checkbox is checked or unchecked.
    const handleDietaryChange = (event) => {
        // If the checkbox is checked, the function adds the checkbox's value to the dietary filters.
        if (event.target.checked) {
            setDietary(prevDietary => [...prevDietary, event.target.value]);
        } else {
            // If the checkbox is unchecked, the function removes the checkbox's value from the dietary filters.
            setDietary(prevDietary => prevDietary.filter(diet => diet !== event.target.value));
        }
    };

    // handleHealthChange is a function that updates the health filters when a checkbox is checked or unchecked.
    const handleHealthChange = (event) => {
        // If the checkbox is checked, the function adds the checkbox's value to the health filters.
        if (event.target.checked) {
            setHealth(prevHealth => [...prevHealth, event.target.value]);
        } else {
            // If the checkbox is unchecked, the function removes the checkbox's value from the health filters.
            setHealth(prevHealth => prevHealth.filter(health => health !== event.target.value));
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search for recipes..." />
            <div className="checkboxes">
                <label>
                    <input type="checkbox" value="DASH" checked={health.includes('DASH')} onChange={handleHealthChange} />
                    Weight Loss
                </label>
                <label>
                    <input type="checkbox" value="vegetarian" checked={health.includes('vegetarian')} onChange={handleHealthChange} />
                    Vegetarian
                </label>
                <label>
                    <input type="checkbox" value="vegan" checked={health.includes('vegan')} onChange={handleHealthChange} />
                    Vegan
                </label>
                <label>
                    <input type="checkbox" value="gluten-free" checked={health.includes('gluten-free')} onChange={handleHealthChange} />
                    Gluten Free
                </label>
                <label>
                    <input type="checkbox" value="dairy-free" checked={health.includes('dairy-free')} onChange={handleHealthChange} />
                    Dairy Free
                </label>
                <label>
                    <input type="checkbox" value="egg-free" checked={health.includes('egg-free')} onChange={handleHealthChange} />
                    Egg Free
                </label>
                <label>
                    <input type="checkbox" value="low-carb" checked={dietary.includes('low-carb')} onChange={handleDietaryChange} />
                    Low Carb
                </label>
                <label>
                    <input type="checkbox" value="low-fat" checked={dietary.includes('low-fat')} onChange={handleDietaryChange} />
                    Low Fat
                </label>
                <label>
                    <input type="checkbox" value="low-sodium" checked={dietary.includes('low-sodium')} onChange={handleDietaryChange} />
                    Low Sodium
                </label>
                <label>
                    <input type="checkbox" value="high-protein" checked={dietary.includes('high-protein')} onChange={handleDietaryChange} />
                    High Protein
                </label>
            </div>
            <div className="calorieRange">
                <label>Calories:</label>
                <div className="minMaxContainer">
                    <input type="number" placeholder="Min Value" min="0" max="6000" value={minCalories} onChange={(e) => setMinCalories(e.target.value)} />
                    <span>-</span>
                    <input type="number" placeholder="Max Value" min="0" max="6000" value={maxCalories} onChange={(e) => setMaxCalories(e.target.value)} />
                </div>
            </div>
            <button type="submit">Search</button>
        </form>
    );
}
SearchForm.propTypes = {
    search: PropTypes.string.isRequired,
    setSearch: PropTypes.func.isRequired,
    health: PropTypes.arrayOf(PropTypes.string).isRequired,
    setHealth: PropTypes.func.isRequired,
    dietary: PropTypes.arrayOf(PropTypes.string).isRequired,
    setDietary: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    minCalories: PropTypes.string.isRequired,
    maxCalories: PropTypes.string.isRequired,
    setMinCalories: PropTypes.func.isRequired,
    setMaxCalories: PropTypes.func.isRequired
};
export default SearchForm;