import { useState, useEffect, useRef } from "react";
import "./styles/Checkout.css";
import { useCart } from "../data/CartContext";
import PostPayment from "../components/PostPayment";

function Checkout() {
  const { getCartItems, clearCart } = useCart();
  const cartItems = getCartItems();

  // state to store credit card number, expiration date, and CVV
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [cvv, setCVV] = useState("");
  const [errors, setErrors] = useState({});
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  // The useRef hook is used to store the previous value of paymentSuccess
  // This is used to check if the paymentSuccess state has changed
  // If it has changed, the cart is cleared and the cartItems are removed from localStorage
  // prevents an infinite loop of clearing the cart
  const paymentSuccessPrev = useRef(paymentSuccess);

  // load cart items to localStorage
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // function to handle storing order in localStorage
  const storeOrder = () => {
    // get existing user data from localStorage
    const userData = localStorage.getItem("user");
    let user = {};
    if (userData) {
      user = JSON.parse(userData);
    }

    // add the new order to the existing user data
    user.orders = user.orders || [];
    user.orders.push({
      timestamp: new Date().toISOString(), // date/time of order for reference
      cartItems: cartItems,
    });

    // update the user key in localStorage with the updated user data
    localStorage.setItem("user", JSON.stringify(user));
  };
  // function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // validate credit card number
    if (creditCardNumber.length !== 16) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        creditCardNumber: "Please enter a valid 16-digit credit card number",
      }));
      return;
    }

    // validate expiration date
    if (!expirationDate.match(/^\d{2}\/\d{2}$/)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expirationDate: "Please enter a valid expiration date in MM/YY format",
      }));
      return;
    }

    // validate CVV
    if (cvv.length !== 3) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cvv: "Please enter a valid 3-digit CVV",
      }));
      return;
    }

    // make sure the card is not expired / month is valid
    const today = new Date();
    const currentYear = today.getFullYear() % 100; // Get the last two digits of the year
    const currentMonth = today.getMonth() + 1; // Month is zero-based, so add 1
    const [enteredMonth, enteredYear] = expirationDate
      .split("/")
      .map((part) => parseInt(part, 10));

    if (enteredMonth > 12) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expirationDate: "Invalid month. Please enter a valid expiration date.",
      }));
      return;
    }

    if (
      enteredYear < currentYear ||
      (enteredYear === currentYear && enteredMonth < currentMonth)
    ) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        expirationDate: "Card expired. Please enter a valid expiration date.",
      }));
      return;
    }

    // check if there are items in the cart
    if (cartItems.length === 0) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        cartItems: "Your cart is empty. Please add items before checking out.",
      }));
      return;
    }

    // if all validations pass, proceed with payment and store order
    setErrors({}); // clear any previous error messages
    setPaymentSuccess(true);
    storeOrder();
  };

  useEffect(() => {
    if (paymentSuccess && paymentSuccess !== paymentSuccessPrev.current) {
      clearCart();
      localStorage.removeItem("cartItems");
      paymentSuccessPrev.current = paymentSuccess;
    }
  }, [paymentSuccess, clearCart]);

  // function to format expiration date as MM/YY while typing
  const handleExpirationDateChange = (e) => {
    let value = e.target.value;
    value = value.replace(/\D/g, ""); // remove non-digit characters
    if (value.length > 4) {
      value = value.substr(0, 4);
    }
    if (value.length > 2) {
      value = value.replace(/(\d{2})(\d{2})/, "$1/$2"); // format as MM/YY
    }
    setExpirationDate(value);
  };

  // calculate total price of items in the cart
  const totalPrice = cartItems.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return (
    <div className="checkout-container">
      <div className="cart">
        <h2>Your Cart:</h2>
        {cartItems.length === 0 ? ( // check if cart is empty for msg
          <p className="noCart">
            <em>No items currently in cart</em>
          </p>
        ) : (
          <>
            <div className="checkout-items">
              {cartItems.map((item) => (
                <div key={item.id} className="checkout-item">
                  <div className="item-details">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="item-image"
                    />
                    <div>
                      <p>{item.name}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>
                        Price: $
                        {parseFloat(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
          </>
        )}
      </div>
      {/* credit card fields and payment info */}
      <div className="payment-container">
        <form className="payment" onSubmit={handleSubmit}>
          <h2>Payment Information</h2>
          <input
            placeholder="Credit Card Number"
            type="text"
            value={creditCardNumber}
            onChange={(e) => setCreditCardNumber(e.target.value.slice(0, 16))}
            required
          />
          {errors.creditCardNumber && (
            <p className="error">{errors.creditCardNumber}</p>
          )}
          <input
            placeholder="Expiration Date (MM/YY)"
            type="text"
            value={expirationDate}
            onChange={handleExpirationDateChange}
            maxLength={5} // limit to 5 characters for MM/YY
            required
          />
          {errors.expirationDate && (
            <p className="error">{errors.expirationDate}</p>
          )}
          <input
            placeholder="CVV"
            type="text"
            value={cvv}
            onChange={(e) => setCVV(e.target.value.slice(0, 3))}
            maxLength={3} // limit to 3 characters for CVV
            required
          />
          {errors.cvv && <p className="error">{errors.cvv}</p>}
          {errors.cartItems && <p className="error">{errors.cartItems}</p>}
          <button type="submit">Pay</button>
          {paymentSuccess && (
            <div>
              <p className="success-message">Payment successful!</p>
              <PostPayment />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default Checkout;
