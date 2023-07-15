// cart.jsx
import React from "react";

function Cart({
  cartItems,
  totalPrice,
  removeFromCart,
  incrementQuantity,
  decrementQuantity,
}) {
  const deliveryFees = 5; // Définissez vos frais de livraison ici

  const hasItems = cartItems.length > 0;

  return (
    <div className="cartbox fixedCart">
      <button
        className={`validcart ${cartItems.length <= 0 ? "disabled" : ""}`}
        disabled={cartItems.length <= 0}
      >
        Valider mon panier
      </button>
      {hasItems ? (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <div className="insidecart">
                <div className="articles">
                  <button
                    className="plusminusbutton"
                    onClick={() => decrementQuantity(item)}
                  >
                    {" "}
                    -{" "}
                  </button>
                  {item.quantity}
                  <button
                    className="plusminusbutton"
                    onClick={() => incrementQuantity(item)}
                  >
                    {" "}
                    +{" "}
                  </button>
                  {item.title}
                </div>{" "}
                <div> {(item.price * item.quantity).toFixed(2)}€</div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="emptycart emptycartmessage">Votre panier est vide</p>
      )}
      {hasItems && (
        <>
          <div className="barre-horizontale"></div>

          <p>
            <div className="insidecart">
              <div>Sous-total</div> <div>{totalPrice.toFixed(2)}€</div>
            </div>
          </p>
          <p>Frais de livraison {deliveryFees.toFixed(2)}€</p>
          <div className="barre-horizontale"></div>

          <p>
            <div className="insidecart">
              <div>Total:</div>{" "}
              <div>{(totalPrice + deliveryFees).toFixed(2)}€</div>
            </div>
          </p>
        </>
      )}
    </div>
  );
}

export default Cart;
