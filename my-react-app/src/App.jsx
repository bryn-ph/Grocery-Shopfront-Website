import './App.css'
import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { CartProvider } from './data/CartContext.jsx';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Catalogue from "./pages/Catalogue";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Planner from "./pages/Planner.jsx";
import Notification from './components/NotificationAlert.jsx';
import UserContext from './data/UserContext';
import NutritionalAdvice from './pages/NutritionalAdvice.jsx';
import GrowingVegetables from './pages/GrowingVegetables.jsx';
import Inventory from './data/Inventory.jsx';

function App() {
  // State to store the notification message and key
  const [notification, setNotification] = useState(null);
  const [notificationKey, setNotificationKey] = useState(0);
  // State to store the logged in status 
  // This is then passed to the UserContext.Provider
  // To provide it to the other sections of the website
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') === 'true');


  // useEffect to store the Inventory data in localStorage from App start
  useEffect(() => {
    localStorage.setItem('Inventory', JSON.stringify(Inventory));
  }, []);

  return (
    <>
      <div>
        <Router>
          <UserContext.Provider value={{ loggedIn, setLoggedIn }}>
            <Navbar setNotification={setNotification} setNotificationKey={setNotificationKey} />
            <main role="main">
              <CartProvider>

                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/Catalogue" element={<Catalogue />} />
                  <Route path="/Profile" element={<Profile setNotification={setNotification} setNotificationKey={setNotificationKey} />} />
                  <Route path="/Checkout" element={<Checkout />} />
                  <Route path="/Planner" element={<Planner setNotification={setNotification} setNotificationKey={setNotificationKey} />} />
                  <Route path="/Login" element={<Login setNotification={setNotification} setNotificationKey={setNotificationKey} />} />
                  <Route path="/SignUp" element={<SignUp setNotification={setNotification} setNotificationKey={setNotificationKey} />} />
                  <Route path="/NutritionalAdvice" element={<NutritionalAdvice />} />
                  <Route path="/GrowingVegetables" element={<GrowingVegetables />} />
                </Routes>
              </CartProvider>
            </main>
            <Footer />
          </UserContext.Provider>
        </Router>
        {/* Ability to show notification messages at bottom of the screen */}
        {notification && <Notification key={notificationKey} message={notification} />}
      </div>
    </>
  )
}

export default App
