import { useState, useEffect } from 'react';
import './styles/Planner.css';
import SearchForm from '../components/SearchForm';
import RecipeCard from '../components/RecipeCard';
import Pagination from '../components/Pagination';
import WeeklyPlan from '../components/WeeklyPlan';
import DailyPlan from '../components/DailyPlan';
import Modal from '../components/Modal';
import RecipeSelectionModal from '../components/RecipeSelectionModal';
import HealthDetails from '../components/HealthDetails';
import PlanModal from '../components/PlanModal';
import FoodTypes from '../data/FoodTypes';
import PropTypes from 'prop-types';

function Planner(props) {
    // used for when fetching data from the API
    const [loading, setLoading] = useState(false);
    // used to store the dietary conditionals of the food from API
    const [dietary, setDietary] = useState([]);
    // used to store the health conditionals of the food from API
    const [health, setHealth] = useState([]);
    // used to store the minimum calories of the food from API
    const [minCalories, setMinCalories] = useState('0');
    // used to store the maximum calories of the food from API
    const [maxCalories, setMaxCalories] = useState('6000');
    // used to store the search query
    const [search, setSearch] = useState('');
    // used to store the current section page is showing
    const [currentSection, setCurrentSection] = useState('recipes');
    // used to store the current page number and update the current page looked at by user
    const [currentPage, setCurrentPage] = useState(1);
    // used to store the number of recipes per page
    const [recipesPerPage] = useState(12); // Change this to the number of recipes you want per page
    const [recipes, setRecipes] = useState([]); // Add this state to store the recipes

    // pop up that shows the recipe details
    const [showModal, setShowModal] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null);

    // pop up that shows the recipe selection modal
    const [showPlanModal, setShowPlanModal] = useState(false);
    const [selectedPlanner, setSelectedPlanner] = useState(null);
    // pop up to confirm using auto buttons
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    // weekly or daily
    const [autoFillType, setAutoFillType] = useState(null);

    // Error message
    const [errorMessage, setErrorMessage] = useState(null);

    // USER FUNCTIONS
    // Get the user details from local storage
    let user = JSON.parse(localStorage.getItem('user')) || {};


    // Save the updated user details back to local storage
    function saveUserDetailsBackToUserList(updatedUser) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        // Save the updated user back to local storage
        localStorage.setItem("user", JSON.stringify(updatedUser));
        // Find the index of the user in the array
        let index = users.findIndex(user => user.email === updatedUser.email);
        // Replace the old user with the updated user
        users[index] = updatedUser;
        // Save the updated array back to local storage
        localStorage.setItem('users', JSON.stringify(users));
    }

    // If the user doesn't have dietary preferences, health goals, or activity level, set them to default values
    // this prevents any errors when trying to access these properties later
    user.dietaryPreferences = user.dietaryPreferences || [];
    user.healthGoals = user.healthGoals || "";
    user.activityLevel = user.activityLevel || "";
    user.weight = user.weight || "";
    user.height = user.height || "";
    user.gender = user.gender || "";

    saveUserDetailsBackToUserList(user);

    // PLANNER FUNCTIONS
    // Weekly meal plan
    // Create a state to store the weekly meal plan
    const initialWeeklyPlan = user.weeklyPlan || {
        Monday: { breakfast: null, lunch: null, dinner: null },
        Tuesday: { breakfast: null, lunch: null, dinner: null },
        Wednesday: { breakfast: null, lunch: null, dinner: null },
        Thursday: { breakfast: null, lunch: null, dinner: null },
        Friday: { breakfast: null, lunch: null, dinner: null },
        Saturday: { breakfast: null, lunch: null, dinner: null },
        Sunday: { breakfast: null, lunch: null, dinner: null },
    };

    // Daily meal plan
    const initialDailyPlan = user.dailyPlan || {
        breakfast: null,
        morning_snack: null,
        lunch: null,
        afternoon_snack: null,
        dinner: null,
    };


    // Assuming weeklyPlan and dailyPlan are your state variables for the weekly and daily planners
    const [weeklyPlan, setWeeklyPlan] = useState(initialWeeklyPlan);
    const [dailyPlan, setDailyPlan] = useState(initialDailyPlan);

    // Whenever weeklyPlan or dailyPlan changes, update them in the user object and save the user object back to local storage
    useEffect(() => {
        user.weeklyPlan = weeklyPlan;
        localStorage.setItem('user', JSON.stringify(user));
        saveUserDetailsBackToUserList(user);
    }, [weeklyPlan]);

    useEffect(() => {
        user.dailyPlan = dailyPlan;
        localStorage.setItem('user', JSON.stringify(user));
        saveUserDetailsBackToUserList(user);
    }, [dailyPlan]);


    // Recipe selection modal
    // Create a state to store the selected day and meal time
    // used when saving from recipe page to one of the planners
    const [showRecipeSelectionModal, setShowRecipeSelectionModal] = useState(false);
    // const [selectedDayMeal, setSelectedDayMeal] = useState({ day: null, meal: null });
    const [selectedDayMeal] = useState({ day: null, meal: null });

    // This is the code responsible for searching the api for recipes
    const handleSearch = (page = 1) => {
        setLoading(true);
        // Documentation for the EDAMAM API: https://developer.edamam.com/edamam-docs-recipe-api
        // Makes the API call here with the search query
        const type = 'public';
        const query = search.toString();
        const appId = '7bb70f1d';
        const appKey = '18f7723ee5d7c01290c259e1336151ee';
        const imageSize = 'REGULAR';
        if (minCalories === '') {
            setMinCalories('0');
        }
        if (maxCalories === '') {
            setMaxCalories('6000');
        }
        const calories = minCalories + '-' + maxCalories;
        const fields = ['label', 'image', 'dietLabels', 'healthLabels', 'ingredientLines', 'calories', 'url', 'externalId'].join('&field=');
        const from = (page - 1) * recipesPerPage;
        const to = page * recipesPerPage;
        // Convert the dietary and health arrays to strings of diet and health parameters
        const dietParams = dietary.map(diet => `&diet=${encodeURIComponent(diet)}`).join('');
        const healthParams = health.map(health => `&health=${encodeURIComponent(health)}`).join('');
        // Fetch the recipes from the API
        fetch(`https://api.edamam.com/api/recipes/v2?type=${type}&q=${query}&app_id=${appId}&app_key=${appKey}&calories=${calories}&imageSize=${imageSize}${dietParams}${healthParams}&field=${fields}&from=${from}&to=${to}`)
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the entire data object
                setRecipes(data.hits); // assuming 'hits' contains the recipes
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error:', error);
                setLoading(false);
            });
    };
    // This function is called when the user submits the search form
    const handleSubmit = (event) => {
        event.preventDefault();
        handleSearch();
    };
    // This function is called when the user clicks on a page number in the pagination component
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        handleSearch(pageNumber);
    };
    // This function is called when the user clicks on a recipe card
    // It will bring up details of the recipe such as ingredients and link to instructions
    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        setShowModal(true);
    };
    // Calculate the total number of pages
    const totalPages = Math.ceil(recipes.length / recipesPerPage);

    // This function is called when the user clicks on the "Add Recipe to planner" button on a recipe card
    // It will bring up a modal to select which meal time to add the recipe to
    // INSTEAD OF DOING IT THIS WAY AS ITS TIME CONSUMING TO MAKE AND REQUIRES A LOT MORE AND NOT VERY EFFICIENT WHEN ANOTHER SEARCH BAR IS IMPLEMENTED WITHIN
    // Instead this function simply links to the recipes tab for the user to add more recipes.
    // const handleAddRecipe = (day, mealTime) => {
    // setSelectedDayMeal({ day, meal: mealTime });
    // setShowRecipeSelectionModal(true);
    const handleAddRecipe = () => {
        setCurrentSection('recipes');
    };

    // This function is called when the user selects a recipe from the recipe selection modal
    // It will add the selected recipe to the weekly or daily meal plan
    // it uses the spread operator to copy the previous state and update the selected day and meal time with the selected recipe
    const handleSelectRecipe = (recipe) => {
        if (selectedDayMeal.day) {
            setWeeklyPlan(prevPlan => ({
                ...prevPlan,
                [selectedDayMeal.day]: {
                    ...prevPlan[selectedDayMeal.day],
                    [selectedDayMeal.meal]: recipe,
                },
            }));
        } else {
            setDailyPlan(prevPlan => ({
                ...prevPlan,
                [selectedDayMeal.meal]: recipe,
            }));
        }
        setShowRecipeSelectionModal(false);

    };
    // This function is called when the user clicks on the "Remove Recipe" button on a meal time in the weekly or daily planner
    // It will remove the recipe from the meal time
    const handleRemoveRecipe = (day, mealTime) => {
        if (day) {
            setWeeklyPlan(prevPlan => ({
                ...prevPlan,
                [day]: {
                    ...prevPlan[day],
                    [mealTime]: null,
                },
            }));
        } else {
            setDailyPlan(prevPlan => ({
                ...prevPlan,
                [mealTime]: null,
            }));
        }
        // Set notification
        props.setNotificationKey(prevKey => prevKey + 1);
        props.setNotification('Recipe removed successfully');
    };
    // This function is called when the user clicks on the "Add to Planner" button on a recipe card
    const handleRecipeAddToPlannerClick = (recipe, planner) => {
        setSelectedRecipe(recipe);
        setSelectedPlanner(planner);
        setShowPlanModal(true);

    };
    // This function is called when the user clicks on the "Exit" button on the recipe selection modal
    const handleClose = () => {
        setShowPlanModal(false);
    };
    // This function is called when the user selects a recipe from the recipe selection modal
    const handleSelect = (time, recipe, day) => {
        if (selectedPlanner === 'weekly') {
            setWeeklyPlan(prevPlan => ({
                ...prevPlan,
                [day]: {
                    ...prevPlan[day],
                    [time]: recipe,
                },
            }));
        } else if (selectedPlanner === 'daily') {
            setDailyPlan(prevPlan => ({
                ...prevPlan,
                [time]: recipe,
            }));
        }

        setShowPlanModal(false);
        // Set notification
        props.setNotificationKey(prevKey => prevKey + 1);
        props.setNotification('Recipe added successfully');
    };
    // This function is called when the user clicks on the "Auto Fill" button in the weekly or daily planner
    function calculateAge() {
        const today = new Date();
        // fixing to expected format
        const [day, month, year] = user.dob.split('/');
        const dobDate = new Date(`${month}/${day}/${year}`);

        let age = today.getFullYear() - dobDate.getFullYear();
        const monthDiff = today.getMonth() - dobDate.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
            age--;
        }

        return parseInt(age);
    }
    // This function is called when the user clicks on the "Auto Fill" button in the weekly or daily planner
    // based on entered user details it sets a calorie limit per day
    function calculateBMR() {
        const weight = user.weight.split(' ')[0];
        const height = user.height.split(' ')[0];
        const age = calculateAge();
        const gender = user.gender;
        // console.log(age);
        // console.log(weight);
        // console.log(height);
        // console.log(gender);
        let bmr = 0;

        if (gender === 'Male') {
            bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * parseInt(age));
        } else if (gender === 'Female') {
            bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * parseInt(age));
        }

        return bmr;
    }

    // Gets a random food from the FoodTypes structure
    // This is used to generate random meals for the autoFillMealPlan function
    function getRandomFood(mealType) {
        // If mealType is 'morning_snack' or 'afternoon_snack', set it to 'snack'
        if (mealType === 'morning_snack' || mealType === 'afternoon_snack' || mealType === 'Morning_snack' || mealType === 'Afternoon_snack') {
            mealType = 'snack';
        }

        // Capitalize the first letter of mealType
        const capitalizedMealType = mealType.charAt(0).toUpperCase() + mealType.slice(1);

        const foods = FoodTypes[capitalizedMealType];
        if (!foods) {
            console.error(`No foods found for meal type: ${capitalizedMealType}`);
            return null;
        }
        const randomIndex = Math.floor(Math.random() * foods.length);
        return foods[randomIndex];
    }
    // Gets user entered health goals and maps them to search terms
    function mapHealthGoalsToSearchTerms(healthGoals) {
        const searchTerms = [];

        const weightLossKeywords = ['weight loss', 'losing weight', 'slimming down', 'shedding pounds', 'cutting weight', 'dropping weight', 'dropping pounds', 'reducing fat'];
        const muscleBuildingKeywords = ['building muscle', 'gaining muscle', 'muscle growth'];
        const balancedDietKeywords = ['balanced diet', 'healthy diet', 'well-rounded diet', 'well rounded diet', 'nutritious diet'];

        // checks if its an empty string or not
        // if its not empty it converts the string to lowercase
        const lowerCaseGoal = typeof healthGoals === 'string' ? healthGoals.toLowerCase() : '';
        // NEEDED TO SWITCH TO ONLY CHECK FOR ONE MATCH AT A TIME USING IF THEN ELSE IFS
        // DUE TO CHANCE OF NO RECIPE BEING FOUND IF MULTIPLE SEARCH TERMS ARE USED
        if (weightLossKeywords.some(keyword => lowerCaseGoal.includes(keyword))) {
            searchTerms.push(`&diet=${encodeURIComponent('low-fat')}`);
            searchTerms.push(`&diet=${encodeURIComponent('low-sodium')}`);
            searchTerms.push(`&health=${encodeURIComponent('DASH')}`);
        }

        else if (muscleBuildingKeywords.some(keyword => lowerCaseGoal.includes(keyword))) {
            searchTerms.push(`&diet=${encodeURIComponent('high-protein')}`);
        }
        else if (balancedDietKeywords.some(keyword => lowerCaseGoal.includes(keyword))) {
            searchTerms.push(`&diet=${encodeURIComponent('balanced')}`);
        }
        else {
            searchTerms.push(`&diet=${encodeURIComponent('balanced')}`);
        }
        // console.log(searchTerms);
        // Add more keyword checks as needed

        return searchTerms;
    }
    async function fetchRecipeFromAPI(food, meal, dietParams, healthParams, calorieLimitPerMeal) {
        try {
            // If meal is 'morning_snack' or 'afternoon_snack', set it to 'snack' as api doesn't have these meal types
            if (meal === 'morning_snack' || meal === 'afternoon_snack' || meal === 'Morning_snack' || meal === 'Afternoon_snack') {
                meal = 'snack';
            }
            const type = 'public';
            const query = food.toString();
            const mealType = meal.toString();
            const appId = '7bb70f1d';
            const appKey = '18f7723ee5d7c01290c259e1336151ee';
            const imageSize = 'REGULAR';

            // input is a range of calories from zero to the limit per day
            const calories = "1-" + parseInt(calorieLimitPerMeal);

            const fields = ['label', 'image', 'dietLabels', 'healthLabels', 'ingredientLines', 'calories', 'url', 'externalId'].join('&field=');
            const from = 0;
            const to = 5;
            // // Convert the dietary and health arrays to strings of diet and health parameters
            // const dietParams = dietary.map(diet => `& diet=${ encodeURIComponent(diet) } `).join('');
            // const healthParams = health.map(health => `& health=${ encodeURIComponent(health) } `).join('');
            // Fetch the recipes from the API
            // fetch(`https://api.edamam.com/api/recipes/v2?type=${type}&q=${query}&app_id=${appId}&app_key=${appKey}&imageSize=${imageSize}&field=${fields}&from=${from}&to=${to}`)
            // Replace this URL with your actual API endpoint
            const url = `https://api.edamam.com/api/recipes/v2?type=${type}&q=${query}&app_id=${appId}&app_key=${appKey}&imageSize=${imageSize}${dietParams}${healthParams}&calories=${calories}&mealType=${mealType}&field=${fields}&from=${from}&to=${to}`;

            const response = await fetch(url);

            if (!response.ok) {
                if (response.status === 429) {
                    throw new Error('You have exceeded the maximum number of requests. Please try again later.');
                } else {
                    throw new Error('An error occurred while fetching the recipe.');
                }
            }

            const data = await response.json();

            // Assuming the API returns a list of recipes and the first recipe is at data.recipes[0]
            // console.log(data);
            const randomIndex = Math.floor(Math.random() * data.hits.length);
            const recipe = data.hits[randomIndex];

            return recipe;
        }
        catch (error) {
            setErrorMessage(error.message);
        }
    }

    // This function is called when the user clicks on the "Auto Fill" button in the weekly or daily planner
    // It will generate meal plans based on the user's health details
    // If they aren't filled out then it will load the health details up with a red message saying please fill these out first
    // What this function will do is on click if the user has filled out their health details it will generate meal plans based
    // on the user's health details, eg gf = gluten free, df = dairy free, etc, wanting healthy diet, etc
    // it will then look through a container of food types eg pizza, pasta and pick say 10 random meals that fit the user's health details
    // it will then select the first recipe from each meal and add it to the meal plan
    // it will then write a message to the user saying why it has chosen these meals
    const autoFillMealPlan = async (planType) => {
        setLoading(true);
        // Reset the error message
        setErrorMessage(null);
        const newWeeklyPlan = {};
        const newDailyPlan = {};

        // Check if the user has filled out their health details
        if (!user.weight || !user.height || !user.gender || !user.activityLevel) {
            setErrorMessage(`You have to fill in health details before you can generate a planner. \n 
            You still have to fill in your ${!user.weight ? 'weight' : ''} ${!user.height ? 'height' : ''} ${!user.gender ? 'gender' : ''} ${!user.activityLevel ? 'activity level' : ''}`);

            // Set a timeout to clear the error message after 6 seconds
            setTimeout(() => {
                setErrorMessage(null);
            }, 6000);
        }
        else {
            // Mapping of dietary preferences to the API's dietary labels
            const dietaryPreferenceMapping = {
                'Gluten Free': 'gluten-free',
                'Dairy Free': 'dairy-free',
                'Egg Free': 'egg-free',
                'Nut Free': 'peanut-free',
                'Vegan': 'vegan',
                'Vegetarian': 'vegetarian'
                // Add more mappings as needed
            };
            const dietaryPreferences = user.dietaryPreferences.map(preference => dietaryPreferenceMapping[preference]);
            const dietParams = dietaryPreferences.map(diet => `&health=${encodeURIComponent(diet)}`).join('');
            // const healthSearchTerms = mapHealthGoalsToSearchTerms(user.healthGoals);
            // const healthParams = healthSearchTerms.map(health => `&diet=${encodeURIComponent(health)}`).join('');

            const healthParams = mapHealthGoalsToSearchTerms(user.healthGoals).join('');

            const mbr = calculateBMR();
            // console.log(mbr);
            const activityLevel = user.activityLevel;

            let activityNumber;
            if (activityLevel === 'Low') {
                activityNumber = 1.2;
            } else if (activityLevel === 'Medium') {
                activityNumber = 1.55;
            } else if (activityLevel === 'High') {
                activityNumber = 1.75;
            }

            // Calculate the calorie limit per day
            const calorieLimitPerDayExcludingSnacks = mbr * activityNumber;
            const calorieLimitPerMeal = calorieLimitPerDayExcludingSnacks / 3;
            // console.log(calorieLimitPerMeal);


            if (planType === 'weekly' || planType === 'both') {
                for (const day of Object.keys(weeklyPlan)) {
                    newWeeklyPlan[day] = {};
                    for (const meal of ['breakfast', 'lunch', 'dinner']) {
                        const food = getRandomFood(meal);
                        const recipe = await fetchRecipeFromAPI(food, meal, dietParams, healthParams, calorieLimitPerMeal);
                        if (recipe && recipe.recipe) {
                            newWeeklyPlan[day][meal] = recipe.recipe;
                        } else {
                            newWeeklyPlan[day][meal] = null; // or {} if you want to set it to an empty object
                        }
                    }
                }
                setWeeklyPlan(newWeeklyPlan);
                props.setNotificationKey(prevKey => prevKey + 1);
                props.setNotification('Weekly meal plan generated successfully');
            }

            // Generate a new daily plan
            if (planType === 'daily' || planType === 'both') {
                for (const meal of Object.keys(dailyPlan)) {
                    const food = getRandomFood(meal);
                    const recipe = await fetchRecipeFromAPI(food, meal, dietParams, healthParams, calorieLimitPerMeal);
                    if (recipe && recipe.recipe) {
                        newDailyPlan[meal] = recipe.recipe;
                    } else {
                        // If no valid recipe is returned, keep the current meal
                        newDailyPlan[meal] = dailyPlan[meal];
                    }
                }
                setDailyPlan(newDailyPlan);
                props.setNotificationKey(prevKey => prevKey + 1);
                props.setNotification('Daily meal plan generated successfully');
            }

            // // Update the state with the new meal plans
            // setWeeklyPlan(newWeeklyPlan);
            // setDailyPlan(newDailyPlan);

        }
        setLoading(false);
    };


    return (
        <div>

            <h1>Meal Plan</h1>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            {loading && <div className="loading">Loading...</div>}
            <div className="sectionTabs">
                <button disabled={currentSection === 'recipes'} onClick={() => setCurrentSection('recipes')}>Recipes</button>
                <button disabled={currentSection === 'weekly'} onClick={() => setCurrentSection('weekly')}>Weekly Planner</button>
                <button disabled={currentSection === 'daily'} onClick={() => setCurrentSection('daily')}>Daily Planner</button>
                <button disabled={currentSection === 'healthDetails'} onClick={() => setCurrentSection('healthDetails')}>Health Details</button>
            </div>

            {currentSection === 'recipes' && (
                <div className='mainContent'>
                    <SearchForm {...{ search, setSearch, health, setHealth, dietary, setDietary, handleSubmit, minCalories, maxCalories, setMinCalories, setMaxCalories }} />
                    {recipes.length > 0 ? (
                        <div className="recipeCards">
                            {recipes.slice((currentPage - 1) * recipesPerPage, currentPage * recipesPerPage).map((recipe) => (
                                <RecipeCard key={recipe.recipe.id} recipe={recipe} handleRecipeClick={handleRecipeClick} handleRecipeAddToPlannerClick={handleRecipeAddToPlannerClick} />
                            ))}
                        </div>
                    ) : (
                        <div>No recipes found</div>
                    )}
                    <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                </div>
            )}


            {currentSection === 'weekly' && (
                <div className='mainContent'>
                    <WeeklyPlan weeklyPlan={weeklyPlan} handleAddRecipe={handleAddRecipe} handleRemoveRecipe={handleRemoveRecipe} />
                    <button disabled={loading} className='autoFill' onClick={() => { setAutoFillType('weekly'); setShowConfirmDialog(true); }}>Auto Fill Weekly</button>
                    <p>The &quot;Auto Fill Weekly&quot; button automatically generates a meal plan for the entire week.</p>
                    <p>The &quot;Auto Fill Daily&quot; button automatically generates a meal plan for the day.</p>
                    <p>This works by reading off any dietary requirements and goals you have entered on the health details page.</p>
                    <p>Please note that in pressing this button any recipes you have entered into the meal plan will be overwritten.</p>
                    <p>Also note that some meal times may be left blank if no applicable recipes can be found by the algorithm, please fill those in manually.</p>
                </div>
            )}


            {currentSection === 'daily' && (
                <div className='mainContent'>
                    <DailyPlan dailyPlan={dailyPlan} handleAddRecipe={handleAddRecipe} handleRemoveRecipe={handleRemoveRecipe} />
                    <button disabled={loading} className='autoFill' onClick={() => { setAutoFillType('daily'); setShowConfirmDialog(true); }}>Auto Fill Daily</button>
                    <p>The &quot;Auto Fill Daily&quot; button automatically generates a meal plan for the day.</p>
                    <p>This works by reading off any dietary requirements and goals you have entered on the health details page.</p>
                    <p>Please note that in pressing this button any recipes you have entered into the meal plan will be overwritten.</p>
                    <p>Also note that some meal times may be left blank if no applicable recipes can be found by the algorithm, please fill those in manually.</p>
                </div>
            )}


            {currentSection === 'healthDetails' && (
                <div>
                    <HealthDetails
                        user={user}
                        saveUserDetailsBackToUserList={saveUserDetailsBackToUserList}
                        setNotification={props.setNotification}
                        setNotificationKey={props.setNotificationKey}
                    />
                </div>
            )}

            {showModal && (
                <Modal recipe={selectedRecipe} setShowModal={setShowModal} />
            )}


            {showRecipeSelectionModal && (
                <RecipeSelectionModal recipes={recipes} handleSelectRecipe={handleSelectRecipe} setShowRecipeSelectionModal={setShowRecipeSelectionModal} />
            )}

            {showPlanModal && (
                <PlanModal
                    plan={selectedPlanner === 'weekly' ? weeklyPlan : dailyPlan}
                    handleSelect={handleSelect}
                    recipe={selectedRecipe}
                    handleClose={handleClose}
                    planner={selectedPlanner}
                />
            )}

            {showConfirmDialog && (
                <div className="confirmDialogOverlay">
                    <div className="confirmDialogBoxAuto">
                        <p>Are your health details correct? The auto fill will run based on them.</p>
                        <div className="buttonContainer">
                            <button onClick={() => { setShowConfirmDialog(false); autoFillMealPlan(autoFillType); }} className='confirmationButton'>Yes</button>
                            <button onClick={() => setShowConfirmDialog(false)} className='cancelButton'>No</button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );


}
Planner.propTypes = {
    setNotification: PropTypes.func.isRequired,
    setNotificationKey: PropTypes.func.isRequired
};
export default Planner;