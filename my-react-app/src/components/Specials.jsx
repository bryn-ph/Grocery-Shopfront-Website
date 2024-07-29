import { useEffect, useState } from "react";
import { FaTag } from "react-icons/fa";
import "./styles/Specials.css";

const Specials = () => {
  const [inventory, setInventory] = useState({ foodProducts: [] });

  // retrieve inventory data from localStorage
  useEffect(() => {
    const storedInventory = localStorage.getItem('Inventory');
    if (storedInventory) {
      setInventory(JSON.parse(storedInventory));
    }
  }, []);

  // filter special items from inventory data
  const specialItems = inventory.foodProducts.filter((item) => item.special);

  // save special items to localStorage
  useEffect(() => {
    localStorage.setItem("specialItems", JSON.stringify(specialItems));
  }, [specialItems]);

  return (
    <div className="specials-container">
      <h1>Current Specials</h1>
      <div className="specials-home">
        {specialItems.map((item) => (
          <div key={item.id} className="specials-item">
            <img src={item.image} alt={item.name} />
            <div className="item-description">
              <h2>{item.name}</h2>
              <p>
                <h3>
                  ${(item.price * (1 - item.discount / 100)).toFixed(2)}
                </h3>
                <span style={{ textDecoration: "line-through" }}>
                  ${item.price.toFixed(2)}
                </span>{" "}
                <FaTag style={{ verticalAlign: "middle", color: "red" }} />{" "}
                <span style={{ color: "red" }}>{item.discount}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Specials;
