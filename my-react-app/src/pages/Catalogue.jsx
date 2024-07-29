import { useState, useEffect, useContext } from "react";
import { useCart } from "../data/CartContext";
import "./styles/Catalogue.css";
import { FaTag, FaShoppingCart } from "react-icons/fa";
import CartPopup from "../components/CartPopup";
import UserContext from "../data/UserContext";

const Catalogue = () => {
  // useContext hook to access the loggedIn state
  const { loggedIn } = useContext(UserContext);
  // useCart hook to access the cart state and setCart function -- maintains across pages
  const { cart, setCart } = useCart();
  // useState to keep track of the items in the catalogue
  const [items, setItems] = useState([]);
  // useState to keep track of the visibility of the cart popup
  const [isCartVisible, setIsCartVisible] = useState(false);
  // useState to keep track of the total quantity of items in the cart
  const [totalQuantity, setTotalQuantity] = useState(0);

  // update total quantity of items in the cart
  useEffect(() => {
    const quantity = cart.reduce((total, item) => total + item.quantity, 0);
    setTotalQuantity(quantity);
  }, [cart]);

  // retrieve inventory data from localStorage
  useEffect(() => {
    const storedInventory = localStorage.getItem('Inventory');
    if (storedInventory) {
      const parsedInventory = JSON.parse(storedInventory);
      setItems(parsedInventory.foodProducts);
    }
  }, []);

  // function to toggle the cart popup
  const toggleCart = () => {
    if (loggedIn) {
      console.log("Toggling cart visibility.");
      setIsCartVisible(!isCartVisible);
    } else {
      console.log(
        "Cart cannot be toggled: user not logged in."
      );
      setIsCartVisible(false);
    }
  };

  // function to add an item to the cart
  const addToCart = (item) => {
    if (!loggedIn) {
      alert("Please log in to add items to the cart.");
      return;
    }

    const itemToAdd = { ...item }; // new object to preserve original

    //make sure correct default value if quantity is not provided
    itemToAdd.quantity = item.quantity || 1;

    // manage item specials
    if (itemToAdd.special) {
      itemToAdd.price = itemToAdd.price * (1 - itemToAdd.discount / 100);
    }

    // check if the item is already in the cart
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.id === itemToAdd.id
    );

    if (existingItemIndex !== -1) {
      // if item is already in the cart, update its quantity properly
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity ?? 1;
      setCart(updatedCart);
    } else {
      // if the item is not in the cart, add normally
      setCart([...cart, itemToAdd]);
    }

    // update the quantity of the item in the catalogue
    setItems(items.map((i) => (i.id === item.id ? { ...i, quantity: 1 } : i)));
  };

  // function to increment the quantity of an item in the cart
  const incrementQuantity = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: (item.quantity ?? 1) + 1 };
        } else {
          return item;
        }
      })
    );
  };

  // function to decrement the quantity of an item in the cart
  const decrementQuantity = (itemId) => {
    setItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === itemId && item.quantity > 1) {
          return { ...item, quantity: (item.quantity ?? 1) - 1 };
        } else {
          return item;
        }
      })
    );
  };

  return (
    <div className="catalogue-container">
      <h1 className="catalogue-title">Our Produce</h1>
      <button className="cart-button" onClick={toggleCart}>
        <FaShoppingCart style={{ verticalAlign: "top" }} /> Cart
        {totalQuantity > 0 && <span className="cart-counter">{totalQuantity}</span>}
      </button>
      {loggedIn && isCartVisible && (
        <CartPopup cart={cart} setCart={setCart} toggleCart={toggleCart} />
      )}
      <div className="catalogue">
        {items.map((item) => (
          <div key={item.id} className="catalogue-item">
            <img src={item.image} alt={item.name} />
            <div className="item-description">
              <h2>{item.name}</h2>
              <p>
                {item.special ? (
                  <>
                    <div className="finalPrice">
                      ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                    </div>
                    <span style={{ textDecoration: "line-through" }}>
                      ${item.price.toFixed(2)}
                    </span>{" "}
                    <FaTag style={{ verticalAlign: "middle", color: "red" }} />{" "}
                    <span style={{ color: "red" }}>{item.discount}%</span>
                  </>
                ) : (
                  <>
                    <div className="finalPrice">${item.price.toFixed(2)}</div>
                  </>
                )}
              </p>
              <br />
              <div className="counter-container">
                <button
                  className="counter"
                  onClick={() => decrementQuantity(item.id)}
                >
                  -
                </button>
                <span className="countNum">{item.quantity ?? 1}</span>
                <button
                  className="counter"
                  onClick={() => incrementQuantity(item.id)}
                >
                  +
                </button>
              </div>
              <br />
              <button className="add-to-cart" onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Catalogue;
