import "./styles/PastOrders.css";
import { useState, useEffect } from "react";
// PastOrders is a functional component that displays recent orders of a user.
function PastOrders() {
  // state to store recent orders
  const [pastOrders, setPastOrders] = useState([]);

  // function to fetch recent orders from localStorage
  useEffect(() => {
    // get user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      const user = JSON.parse(userData);
      // get orders from user data
      const orders = user.orders || [];
      // reverse the array to display most recent orders at the top
      setPastOrders(orders.reverse());
    }
  }, []);

  return (
    <div className='sectionContent'>
      <h2 className='sectionTitleField'>Recent Orders</h2>
      <br />
      {pastOrders.map((order, index) => (
        <div key={index} className="past-order">
          <h3 className="order-date">Order Date: {new Date(order.timestamp).toLocaleString()}</h3>
          <ul className="order-items">
            {order.cartItems.map((item, itemIndex) => (
              <li key={itemIndex} className="order-item">
                {item.name} - Quantity: {item.quantity}
              </li>
            ))}
          </ul>
          <p className="order-total">Total Price: ${calculateTotalPrice(order.cartItems).toFixed(2)}</p>
        </div>
      ))}
    </div>

  );
}

// function to calculate total price
function calculateTotalPrice(cartItems) {
  return cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);
}

export default PastOrders;
