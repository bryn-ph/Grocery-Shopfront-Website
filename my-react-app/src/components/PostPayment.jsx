import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./styles/PostPayment.css";

const PostPayment = () => {
  // state to store cart items
  const [cartItems, setCartItems] = useState([]);
  // state to store whether the modal is open
  const [isOpen, setIsOpen] = useState(true);
  // state to store total price
  const [totalPrice, setTotalPrice] = useState(0);

  // load cart items from localStorage and calculate total price
  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      const parsedCartItems = JSON.parse(storedCartItems);
      setCartItems(parsedCartItems);

      // calculate total price
      const price = parsedCartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
      setTotalPrice(price);
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="postPayment-backdrop">
      <div className="postPayment-container">
        <button onClick={() => setIsOpen(false)} className="close-button">
          X
        </button>
        <br />
        <h1>Thanks for Ordering!</h1>
        <br />
        <div className="content-container">
          <h2>Order Details:</h2>
          <br />
          {cartItems.map((item, index) => (
            <div className="postPayment-content" key={index}>
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <br />
            </div>
          ))}
          <br />
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          <br />
          <Link to="/Profile" className="buttonViewPastOrders">
            View Profile and Past Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostPayment;
