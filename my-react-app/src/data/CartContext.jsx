import { createContext, useContext, useState } from "react";
import PropTypes from 'prop-types';

const CartContext = createContext();
// CartProvider is a component that provides the cart state to all its children.
// It takes a list of children as props and returns a CartContext.Provider component with the cart state.
// The cart state is an array of items in the cart.
// it needs to be reached on all pages via the checkout button in nav
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Function to get cart items
  const getCartItems = () => {
    return cart;
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, setCart, getCartItems, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

CartProvider.propTypes = {
  children: PropTypes.node.isRequired
};