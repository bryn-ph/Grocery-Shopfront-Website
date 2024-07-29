import { Link } from "react-router-dom";
import "./styles/CartPopup.css";
import { useCart } from "../data/CartContext";

// CartPopup component
const CartPopup = () => {
  const { cart, setCart } = useCart();
  const deleteItem = (index) => {
    setCart(cart.filter((item, i) => i !== index));
  };

  //function to calculate the total price of the cart
  const totalPrice = cart.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="cart-popup">
      <h3>Items:</h3>
      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <div className="item-details">
            <img src={item.image} alt={item.name} className="item-image" />
            <div>
              <h4>{item.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>${parseFloat(item.price * item.quantity).toFixed(2)}</p>
            </div>
          </div>
          <div className="cart-delete">
            <button onClick={() => deleteItem(index)}>Delete</button>
          </div>
        </div>
      ))}
      <h4>Total: ${parseFloat(totalPrice).toFixed(2)} </h4>
      <Link to="/checkout" className="cart-checkout-button">
        Checkout
      </Link>
    </div>
  );
};

export default CartPopup;
