import "./styles/Navbar.css";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext, useEffect } from "react";
import UserContext from "../data/UserContext";
import {
  FaHome,
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserPlus,
  FaListAlt,
  FaSolarPanel,
  FaRunning,
  FaMoneyBill,
} from "react-icons/fa";

function NavBar(props) {
  const { loggedIn, setLoggedIn } = useContext(UserContext);

  // NEEDED FOR DROP DOWN STUFF IN NAV FOR ORGANIC FARMING
  const location = useLocation();
  const isOrganicPath = ['/GrowingVegetables', '/NutritionalAdvice'].includes(location.pathname);

  // const loggedIn = localStorage.getItem("loggedIn") === "true";
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  // const [loggedInState, setLoggedIn] = useState(loggedIn);

  // Ensures that when the user logs out, they are redirected to the home page instantly
  useEffect(() => {
    if (loggedIn === false) {
      navigate("/");
    }
  }, [loggedIn]);

  function handleLogout() {
    localStorage.setItem("loggedIn", "false");
    setLoggedIn(false);

    props.setNotification("" + user.firstName + " logged out successfully");
    props.setNotificationKey((prevKey) => prevKey + 1);
    // Updates the user object in local storage so that when they log in again all their details are still there
    handleUpdatedUser();
  }

  function handleUpdatedUser() {
    //
    // COMMENTS CURRENTLY NOT WORKING AS INTENDED
    //
    // let users = JSON.parse(localStorage.getItem('users')) || [];
    // // Save the updated user back to local storage
    // localStorage.setItem("user", JSON.stringify(updatedUser));
    // // Find the index of the user in the array
    // let index = users.findIndex(user => user.username === updatedUser.username);
    // // Replace the old user with the updated user
    // users[index] = updatedUser;
    // // Save the updated array back to local storage
    // localStorage.setItem('users', JSON.stringify(users));

    // delete the user object from local storage
    // could opt to clear instead of delete
    localStorage.removeItem("user");
  }

  return (
    <nav>
      {/* Left navbar/title */}
      <Link to="/" className="title">
        SOIL
      </Link>
      {/* Centre navbar */}
      <ul>
        <li>
          <NavLink to="/">
            <FaHome style={{ verticalAlign: "top" }} /> Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/catalogue">
            <FaListAlt style={{ verticalAlign: "top" }} /> Catalogue
          </NavLink>
        </li>
        <li className="nav-item dropdown">
          <Link to="#" className={`nav-link ${isOrganicPath ? 'active' : ''}`}>
            <FaSolarPanel style={{ verticalAlign: "top" }} /> Organic Farming
          </Link>
          <div className="dropdown-menu">
            <Link to="/GrowingVegetables" className="dropdown-item">Growing Your Own Vegetables</Link>
            <Link to="/NutritionalAdvice" className="dropdown-item">Nutritional Advice</Link>
          </div>
        </li>
        {/* <li>
          <NavLink to="/farm">
            <FaSolarPanel style={{ verticalAlign: "top" }} /> Organic Farming
          </NavLink>
        </li> */}
        {loggedIn ? (
          <li>
            <NavLink to="/planner">
              <FaRunning style={{ verticalAlign: "top" }} /> Meal Planner
            </NavLink>
          </li>
        ) : null}
      </ul>
      {/* Hidden / loggedIn navbar */}
      <ul>
        {loggedIn ? (
          <li>
            <NavLink to="/checkout">
              <FaMoneyBill style={{ verticalAlign: "top" }} /> Checkout
            </NavLink>
          </li>
        ) : null}
        {loggedIn ? (
          <li>
            <NavLink to="/profile">
              <FaUser style={{ verticalAlign: "top" }} /> Profile
            </NavLink>
          </li>
        ) : null}
        {loggedIn ? (
          <li>
            <Link onClick={handleLogout}>
              <FaSignOutAlt style={{ verticalAlign: "top" }} /> Logout
            </Link>
          </li>
        ) : (
          <>
            {/* Right Navbar */}
            <li>
              <NavLink to="/login">
                <FaSignInAlt style={{ verticalAlign: "top" }} /> Login
              </NavLink>
            </li>
            <li>
              <NavLink to="/signUp">
                <FaUserPlus style={{ verticalAlign: "top" }} /> Sign Up
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

NavBar.propTypes = {
  setNotification: PropTypes.func.isRequired,
  setNotificationKey: PropTypes.func.isRequired,
};

export default NavBar;
