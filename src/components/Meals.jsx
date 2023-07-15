import React, { useState } from "react";
import Cart from "./Cart";

function Meals(props) {
  const { data } = props;
  const mealsData = data.categories;
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(true); // Variable de suivi pour l'état actuel

  // Vérifier si mealsData est undefined ou null
  if (!mealsData) {
    return "loading"; // Ou affichez un message d'erreur approprié
  }

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  const addToCart = (meal) => {
    const existingItem = cartItems.find((item) => item.id === meal.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...meal, quantity: 1 }]);
    }
  };

  const removeFromCart = (meal) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== meal.id);
    setCartItems(updatedCartItems);
  };

  const incrementQuantity = (meal) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCartItems);
  };

  const decrementQuantity = (meal) => {
    const existingItem = cartItems.find((item) => item.id === meal.id);

    if (existingItem && existingItem.quantity > 1) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === meal.id ? { ...item, quantity: item.quantity - 1 } : item
      );
      setCartItems(updatedCartItems);
    } else {
      removeFromCart(meal);
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const toggleCartDisplay = () => {
    const cartElement = document.querySelector(".cartclass2");

    if (cartElement.style.display === "none") {
      cartElement.style.display = "flex";
    } else {
      cartElement.style.display = "none";
    }

    setShowCart(!showCart); // Inverser l'état actuel
  };

  const isCartEmpty = cartItems.length === 0;

  return (
    <div className="bgrey">
      <div className="generalmeals">
        <div className="meals">
          {mealsData.map((category) => {
            if (category.meals.length === 0) {
              return null; // ne pas afficher les catégories vides
            }

            return (
              <div className="grosbloc" key={category.name}>
                <h3 className="cat">{category.name}</h3>
                <div className="mealsContainer">
                  {category.meals.map((meal) => (
                    <div
                      className="mealsBlock"
                      key={meal.id}
                      onClick={() => addToCart(meal)}
                    >
                      <div className="mealsChild">
                        <div className="mealschild1">
                          <h4 className="colorblack">{meal.title}</h4>
                          <p className="colorclear">
                            {truncateText(meal.description, 100)}
                          </p>
                          <p className="price" id="price">
                            {meal.price}€
                          </p>
                        </div>
                        <div className="mealschild2">
                          {meal.picture && (
                            <img
                              className="mealsPicture"
                              src={meal.picture}
                              alt={meal.title}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <div className="cartclass">
          <Cart
            cartItems={cartItems}
            totalPrice={calculateTotalPrice()}
            removeFromCart={removeFromCart}
            incrementQuantity={incrementQuantity}
            decrementQuantity={decrementQuantity}
          />
        </div>
      </div>
      {!isCartEmpty && (
        <div className="parent-container">
          <div className={showCart ? "cartclass2" : "cartclass2 hidden"}>
            <Cart
              cartItems={cartItems}
              totalPrice={calculateTotalPrice()}
              removeFromCart={removeFromCart}
              incrementQuantity={incrementQuantity}
              decrementQuantity={decrementQuantity}
            />
          </div>
          <div className="aligncartmobile">
            <div
              className={`cartmobilebutton ${isCartEmpty ? "disabled" : ""}`}
              onClick={toggleCartDisplay}
            >
              <div>{totalQuantity}</div>
              <div>voir le panier</div>
              <div>{calculateTotalPrice().toFixed(2)}€</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Meals;
