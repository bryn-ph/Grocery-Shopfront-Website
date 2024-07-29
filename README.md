# SOIL Website

## Sections

- [Project Link](#access)
- [Made By](#made-by)
- [About SOIL](#about)
- [Project Overview](#project-overview)
- [Features Implemented in Assessment 1](#features-implemented-in-assessment-1)
- [How To Run](#usage)
- [Resources Used](#resources-used)
- [Credits & Key Notes](#credits)

## Access

Accessible at [GitHub Link To Project](https://github.com/rmit-fsd-2024-s1/s3981189-s4007036-a1)

## Made By

- Bryn - s3981189
- Jesse - s4007036

## About

SOIL is a long-term organic food grocer based in Melbourne, dedicated to providing premium, organic fresh food to the community. Apart from being food grocers, they offer face-to-face seminars on diet, nutrition, and small-scale organic farming. However, in the face of stiff competition from online food businesses, SOIL is revamping its website to enhance customer engagement and stay relevant in the digital age.

## Project Overview

The SOIL website project aims to create a modern online platform for the business, focusing on delivering a superior user experience and offering features such as online shopping, forums for discussion, reviews, and search functionalities.
This project was made using React + Vite, for faster load times and less vulnerabilities.

## Features Implemented in Assessment 1

**Note:**

As apart of the requirements for assignment 1 all data pertaining to the user such as user details, meal plans, cart info & past orders are stored within localStorage. Because of this please do not enter any private information such as actual passwords you may use.

## Pages & Key Components

1. **App.jsx**:
    - Manages the overall structure and routing of the application.
    - Implements React Router for navigation between pages.
    - Utilizes context providers (UserContext and CartProvider) for managing user authentication and shopping cart state.
    - Includes components for navigation (Navbar) and footer (Footer) which are rendered on every page.
    - Defines routes for different pages such as Home, Catalogue, Profile, Checkout, Planner, Farm, Login, SignUp, NutritionalAdvice, and GrowingVegetables.
    - Utilizes localStorage to maintain the logged-in status of users.
    - Implements notification alerts using the Notification component.
    - Manages state for notification messages and keys using React hooks (useState).

2. **Home.jsx**:
    - Represents the home page of the application.
    - Displays a welcome message and general information about the page.
    - Conditionally renders a greeting message based on whether the user is logged in.
    - Imports and renders the Specials component to display weekly specials.
    - Imports and renders multiple instances of the LinkCards component for displaying additional links or information. This is used to give the user a little more info about some of the links on the nav bar and to what the website is actually capable of.

3. **SignUp.jsx**:
    - Represents the sign-up page of the application.
    - Allows users to register by providing their email, password, first name, last name, and date of birth.
    - Implements form validation for email, password, and date of birth fields.
    - Provides real-time feedback on password strength and validity.
    - Utilizes React Router's useNavigate hook for navigation to the login page upon successful registration.
    - Displays error messages for invalid input and password mismatch.
    - Implements password requirements such as minimum length, uppercase, lowercase, number, and symbol.
    - Shows a confirmation message upon successful registration.
    - Utilizes local storage to store user information upon registration.

4. **Login.jsx**:
    - Represents the login page of the application.
    - Allows users to log in by providing their email and password.
    - Utilizes form validation for email and password fields.
    - Implements password visibility toggle functionality.
    - Validates user credentials against stored user data in local storage.
    - Displays a notification upon successful login, showing the user's first name.
    - Sets the user as logged in and stores user data in local storage upon successful login.
    - Redirects users to the home page after successful login.
    - Provides a link to the sign-up page for new users.

5. **Catalogue.jsx**:
   - Represents the catalogue page of the application.
   - Displays a list of the available inventory through retrieval of "database" (local storage).
   - Allows users to add items to their cart, storing in local storage using CartContext.
   - Implements the CartPopup component to allow users to open and close their cart information.

6. **CartPopup.jsx**:
   - This component represents the users cart of items to purchase.
   - Presented in the form of a popup window on the catalogue page.
   - Utilizes CartContext to display all cart items through local storage.
   - Allows users to delete items from their cart, or navigate to checkout page for payment.

7. **Specials.jsx**:
   - Represents and displays current items on special.
   - Retrieves inventory data from localStorage on initial render
   - Filters out special items from the inventory data.
   - Renders each special item with its name, image, discounted price, original price, and sale percentage.

8. **Checkout.jsx**:
   - Represents the checkout/payment page of the application.
   - Renders all final cart items and parameters through CartContext.
   - Validates user payment information (card number, date, and cvv).
   - Upon successful payment, stores order details and displays success popup pertaining order details.
9. **Profile.jsx**:
   - Represents the profile page component where users can view or edit their personal details and update password settings.
   - Provides tabs for navigating between different sections such as past orders, reviews, account details, health details, password settings, and delete account.
   - Utilises local storage to store and update user details.
   - Contains components for each section: PastOrdersTab, Reviews, AccountDetails, HealthDetail, PasswordSettings, and DeleteAccount.
   - Implements functionality for saving user details, validating inputs, and deleting the user account.
   - Requires the setNotification and setNotificationKey functions as props for displaying notifications.

10. **Planner.jsx**:

    The Planner component in our application facilitates meal planning for users based on their dietary preferences and health goals. It allows users to search for recipes, create weekly or daily meal plans, and has an algorithm for determining meals to be placed on the meal plans based on user health details. Please note that this planner currently gets its recipes from the EDAMAM API [EDAMAM API](https://developer.edamam.com/edamam-docs-recipe-api).
    Important to note that on the recipe page section there is a way to select how many calories the recipes showed will contain, the function for this works as intented however EDAMAM API has incorrectly listed calories information and as such the calories showed in the recipe cards are not correct but the recipe itself when clicking to the real link to the recipe is in the correct range of calories.

    - Users can search for recipes using keywords and filters such as health conditions and dietary preferences as well as a calories range bar.
    - Users can create meal plans for the entire week or for individual days, meal plans contain options for breakfast, lunch, dinner and on the daily, snacks as well.
    - Users have the option to generate meal plans automatically based on their health details entered on the other page or in the profile section.
    - This auto feature takes the users gender, height, weight, and activity level to use an algorithm to determine the users recommended daily calories intake. It then takes in dietary preferences and health goals to filter the results.
    - Clicking on a recipe card or the buttons on the recipe will open a modal window displaying detailed information about the recipe such as ingredients and will allow users to add the recipe to a planner.

11. **GrowingVegetables.jsx & NutritionalAdvice.jsx**:
    - These components are used to display useful information that users may want to know or learn about for self improvement.

12. **NotificationAlert.jsx**:
    - Represents a notification message component used to display messages to the user.
    - Accepts a message prop to display the notification content.
    - Utilizes state to control the visibility of the notification.
    - Uses the useEffect hook to automatically hide the notification after 3 seconds.
    - Renders the notification message inside a styled div.
    - Requires the message prop to be a string according to PropTypes validation.

## Usage

To run the project locally:

- The current version of node used in this project is npm version 10.2.4
- Please ensure this is the same version you are using when trying to run.

1. Clone the repository.
2. Navigate to the project directory.
3. Install dependencies: `npm install`.
4. Start the development server: `npm run dev`.
5. Access the website in your browser at `http://localhost:5173`.

## Resources Used

- [Unsplash](https://unsplash.com/) - Royalty-Free Images.
- [Adobe Stock](https://stock.adobe.com/au/) - More Royalty-Free Images Used.
- [Iconify](https://iconify.design/) - Symbols & Icons used.
- [Flaticon](https://www.flaticon.com/) - Additional Icons.
- [ChatGPT](https://chat.openai.com/) - Troubleshooting & Testing.
- [Bunnings](https://www.bunnings.com.au/diy-advice/garden) Growing Garden Info.
- [Almanac](https://www.almanac.com/vegetable-growing-guide) More Growing Garden Info.
- [World Health Organisation](https://www.who.int/news-room/fact-sheets/detail/healthy-diet) Diet & Health Info.
- [OstroVit](https://ostrovit.com/en/blog/caloric-demand-how-to-calculate-it-what-does-it-depend-on-1620652901.html#:~:text=Here%20is%20the%20simplest%20formula,6.8%20%C3%97%20age%20in%20years) Calorie Calculator & Formula.
- [Woolworths](https://www.woolworths.com.au/) Used for Inspiration & Design
- [Chefgood](https://chefgood.com.au/) Used for Inspiration & Design

## Credits

This project is developed by Bryn and Jesse as part of their assignment 1 of Full Stack Development class at RMIT University.

---
**Notes:**

- This project was made using React + Vite
- This template provided minimal setup to get React working in Vite with HMR and some ESLint rules.
- Currently, two official plugins are available:
- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh -->
