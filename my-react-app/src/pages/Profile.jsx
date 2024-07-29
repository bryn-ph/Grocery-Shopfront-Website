import { useState } from "react";
import EditableField from "../components/EditableField";
import HealthDetails from "../components/HealthDetails";
import PastOrders from "../components/PastOrders";
import {
  isEmailRegistered,
  isValidEmail,
  isValidDob,
  isValidName,
  isValidPassword,
} from "../data/Validation";
import PropTypes from "prop-types";
import eyeShow from "../assets/eyeShow.svg";
import eyeHide from "../assets/eyeHide.svg";
import "./styles/Profile.css";
function Profile(props) {
  const [activeTab, setActiveTab] = useState("Account Details");
  let user = JSON.parse(localStorage.getItem("user")) || {};

  function saveUserDetailsBackToUserList(updatedUser) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    // Save the updated user back to local storage
    localStorage.setItem("user", JSON.stringify(updatedUser));
    // Find the index of the user in the array
    let index = users.findIndex((user) => user.email === updatedUser.email);
    // Replace the old user with the updated user
    users[index] = updatedUser;
    // Save the updated array back to local storage
    localStorage.setItem("users", JSON.stringify(users));
  }

  function PastOrdersTab() {
    return (
      <div className="tabContent">
        <PastOrders />
      </div>
    );
  }

  function Reviews() {
    return (
      <div className="tabContent">
        <p>Review Content</p>
        <p>Coming soon...</p>
        <p>
          This section will let you edit and delete reviews you made on
          different products
        </p>
      </div>
    );
  }
  function AccountDetails() {
    // STATE FOR THE USER DETAILS
    const [email, setEmail] = useState(user.email || "");
    const [firstName, setFirstName] = useState(user.firstName || "");
    const [lastName, setLastName] = useState(user.lastName || "");
    const [dob, setDob] = useState(user.dob || "");

    // HANDLE SAVE FUNCTIONS
    const handleEmailSave = (newEmail) => {
      setEmail(newEmail);
      // AS THIS IS SERVING AS THE KEY FOR THE ACCOUNT IT MUST BE CHANGED DIFFERENTLY
      // Get the users array from local storage
      let users = JSON.parse(localStorage.getItem("users"));

      // Find the index of the user in the array
      let index = users.findIndex((u) => u.email === user.email);
      // Update the username in the users array
      users[index].email = newEmail;

      // Save the updated users array back to local storage
      localStorage.setItem("users", JSON.stringify(users));

      user.email = newEmail;
      localStorage.setItem("user", JSON.stringify(user));
      // Shows notification message and clears the previous message
      props.setNotificationKey((prevKey) => prevKey + 1);
      props.setNotification("Email updated successfully");
    };
    const handleFirstNameSave = (newName) => {
      setFirstName(newName);
      user.firstName = newName;
      localStorage.setItem("user", JSON.stringify(user));
      saveUserDetailsBackToUserList(user);
      props.setNotificationKey((prevKey) => prevKey + 1);
      props.setNotification("First name updated successfully");
    };
    const handleLastNameSave = (newName) => {
      setLastName(newName);
      user.lastName = newName;
      localStorage.setItem("user", JSON.stringify(user));
      saveUserDetailsBackToUserList(user);
      props.setNotificationKey((prevKey) => prevKey + 1);
      props.setNotification("Last name updated successfully");
    };
    const handleDobSave = (newDob) => {
      setDob(newDob);
      user.dob = newDob;
      localStorage.setItem("user", JSON.stringify(user));
      saveUserDetailsBackToUserList(user);
      props.setNotificationKey((prevKey) => prevKey + 1);
      props.setNotification("Date of birth updated successfully");
    };

    // VALIDATION FUNCTIONS
    const validateEmail = (email) => {
      // Check if the email is valid and not already registered
      if (isEmailRegistered(email)) {
        return "This email is already registered.";
      }
      if (!isValidEmail(email)) {
        return "Please enter a valid email.";
      }
      return null;
    };
    const validateDob = (dob) => {
      // Check if the date of birth is valid
      if (!isValidDob(dob)) {
        return "Please enter a valid date of birth in the format DD/MM/YYYY.";
      }
      return null;
    };
    const validateName = (name) => {
      // Check if the name is valid
      if (!isValidName(name)) {
        return "Please enter a valid name.";
      }
      return null;
    };

    return (
      <div className="tabContent">
        <div className="sectionContent">
          <h2 className="sectionTitleField">Personal Details</h2>
          <p className="additionalFields">
            <b>Account Creation Date:</b>
          </p>
          <p className="additionalValues">{user.joinDate}</p>
          <EditableField
            label="Email"
            initialValue={email}
            onSave={handleEmailSave}
            hint={"Enter your email"}
            validation={validateEmail}
          />
          <EditableField
            label="First Name"
            initialValue={firstName}
            onSave={handleFirstNameSave}
            hint={"Enter your first name"}
            validation={validateName}
          />
          <EditableField
            label="Last Name"
            initialValue={lastName}
            onSave={handleLastNameSave}
            hint={"Enter your last name"}
            validation={validateName}
          />
          <EditableField
            label="Date of Birth"
            initialValue={dob}
            onSave={handleDobSave}
            hint={"dd/mm/yyyy"}
            validation={validateDob}
          />
        </div>
      </div>
    );
  }
  function HealthDetail() {
    return (
      <div>
        <HealthDetails
          user={user}
          saveUserDetailsBackToUserList={saveUserDetailsBackToUserList}
          setNotification={props.setNotification}
          setNotificationKey={props.setNotificationKey}
        />
      </div>
    );
  }

  function PasswordSettings() {
    // STATE FOR THE PASSWORD SETTINGS
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    // HANDLE SAVE FUNCTIONS
    const handlePasswordSave = (event) => {
      event.preventDefault();
      setErrorMessage(""); // Clear the error message at the start of validation
      if (!currentPassword || !newPassword) {
        // global notification
        // props.setNotificationKey(prevKey => prevKey + 1);
        // props.setNotification('Please enter your current and new password');
        // red alert text
        setErrorMessage("Please enter your current and new password");
        return;
      }
      if (currentPassword !== user.password) {
        // props.setNotificationKey(prevKey => prevKey + 1);
        // props.setNotification('Current password is incorrect');
        setErrorMessage("Current password is incorrect");
        return;
      }
      const validationError = validatePassword(newPassword);
      if (validationError) {
        // props.setNotificationKey(prevKey => prevKey + 1);
        // props.setNotification(errorMessage);
        setErrorMessage(validationError);
        return;
      }
      user.password = newPassword;
      localStorage.setItem("user", JSON.stringify(user));
      saveUserDetailsBackToUserList(user);
      props.setNotificationKey((prevKey) => prevKey + 1);
      props.setNotification("Password updated successfully");
    };
    // VALIDATION FUNCTION
    const validatePassword = (password) => {
      // Check if the password is valid
      // will return the correct error message if its not
      const validationError = isValidPassword(password);
      if (validationError) {
        return validationError;
      }
      return null;
    };
    return (
      <div className="tabContent">
        <div className="sectionContent">
          <h2 className="sectionTitleField">Password Settings</h2>
          <form onSubmit={handlePasswordSave}>
            <div className="fieldContainer">
              <label className="fieldLabel">Current Password:</label>
              <div className="inputContainer">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="fieldValue editable"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <button
                  className="showHideButton"
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <img
                    src={showCurrentPassword ? eyeShow : eyeHide}
                    alt={showCurrentPassword ? "Show" : "Hide"}
                  />
                </button>
              </div>
            </div>
            <div className="fieldContainer">
              <label className="fieldLabel">New Password:</label>
              <div className="inputContainer">
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="fieldValue editable"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <button
                  className="showHideButton"
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <img
                    src={showNewPassword ? eyeShow : eyeHide}
                    alt={showNewPassword ? "Show" : "Hide"}
                  />
                </button>
              </div>
            </div>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
            <div>
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  function DeleteAccount() {
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);

    const handleDeleteAccount = (event) => {
      event.preventDefault();
      setShowConfirmDialog(true);
    };

    const deleteAccount = () => {
      // Get the users array from local storage
      let users = JSON.parse(localStorage.getItem("users")) || [];
      // Sets the user array to include everything except the user that is being deleted
      users = users.filter((u) => u.email !== user.email);
      // Save the updated users array back to local storage
      localStorage.setItem("users", JSON.stringify(users));
      // Remove the user from local storage
      localStorage.removeItem("user");
      // Set the logged in status to false
      localStorage.setItem("loggedIn", "false");
      // Redirect to home page after deletion
      // Navigate isn't used here as the page needs to refresh to show correct nav bar
      window.location.href = "/";
    };

    return (
      <div className="tabContent" id="deleteAccountSection">
        <div className="sectionContent">
          <h2 className="sectionTitleField">Delete Account</h2>
          <p>Warning: This action cannot be undone.</p>
          <form onSubmit={handleDeleteAccount}>
            <button type="submit" id="deleteAccountButton">
              Delete My Account
            </button>
          </form>
          {showConfirmDialog && (
            <div className="confirmDialogOverlay">
              <div className="confirmDialogBox">
                <p>
                  Are you sure you want to delete your account? This action
                  cannot be undone.
                </p>
                <div className="buttonContainer">
                  <button
                    onClick={deleteAccount}
                    className="confirmationButton"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setShowConfirmDialog(false)}
                    className="cancelButton"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="titleBanner">
        <h2>Profile</h2>
        <p>
          View or edit your personal details and update your password settings
        </p>
      </div>
      <div className="tabList">
        <button
          className={`tabButton ${activeTab === "Past Orders" ? "active" : ""}`}
          onClick={() => setActiveTab("Past Orders")}
          role="tab"
        >
          Past Orders
        </button>
        <button
          className={`tabButton ${activeTab === "Reviews" ? "active" : ""}`}
          onClick={() => setActiveTab("Reviews")}
          role="tab"
        >
          Reviews
        </button>
        <button
          className={`tabButton ${activeTab === "Account Details" ? "active" : ""
            }`}
          onClick={() => setActiveTab("Account Details")}
          role="tab"
        >
          Account Details
        </button>
        <button
          className={`tabButton ${activeTab === "Health Details" ? "active" : ""
            }`}
          onClick={() => setActiveTab("Health Details")}
          role="tab"
        >
          Health Details
        </button>
        <button
          className={`tabButton ${activeTab === "Password Settings" ? "active" : ""
            }`}
          onClick={() => setActiveTab("Password Settings")}
          role="tab"
        >
          Password Settings
        </button>
        <button
          className={`tabButton ${activeTab === "Delete Account" ? "active" : ""
            }`}
          onClick={() => setActiveTab("Delete Account")}
          role="tab"
          id="accountDelBtn"
        >
          Delete Account
        </button>
      </div>
      {activeTab === "Past Orders" && <PastOrdersTab />}
      {activeTab === "Reviews" && <Reviews />}
      {activeTab === "Account Details" && <AccountDetails />}
      {activeTab === "Health Details" && <HealthDetail />}
      {activeTab === "Password Settings" && <PasswordSettings />}
      {activeTab === "Delete Account" && <DeleteAccount />}
    </div>
  );
}
Profile.propTypes = {
  setNotification: PropTypes.func.isRequired,
  setNotificationKey: PropTypes.func.isRequired,
};
export default Profile;
