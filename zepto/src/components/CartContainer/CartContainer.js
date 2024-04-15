import React from "react";
import { useFirebase } from "../../context/Firebase";
import classes from "./CartContainer.module.css";
import { Link } from "react-router-dom";
import CartProducts from "../CartProducts/CartProducts";
import { calculateTotalItems } from "../../utils/cart";
import Price from "../Price/Price";
import DeliveryAddress from "../DeliveryAddress/DeliveryAddress";
import DeliveryPartnerTip from "../DeliveryPartnerTip/DeliveryPartnerTip";
import DeliveryInstructions from "../DeliveryInstructions/DeliveryInstructions";
import DeliveryPartnerSafety from "../DeliveryPartnerSafety/DeliveryPartnerSafety";

export default function CartContainer() {
  const { cart } = useFirebase();

  let countOfItems = calculateTotalItems(cart);

  const calculateAmountSaved = () => {
    let handlingCharges = 10;
    let deliveryFee = 25;
    let amountSaved = cart.reduce((total, cartItem) => {
      return total + (cartItem.actualPrice - cartItem.salePrice)*cartItem.quantity;
    }, 0);
    return amountSaved + handlingCharges + deliveryFee;
  };

  return (
    <div className={classes["cart-container"]}>
      <div className={classes["cart-items-amount-saved-container"]}>
        <div className={classes["cart-items-container"]}>
          <h3>
            Cart ({countOfItems} {countOfItems === 1 ? "Item" : "Items"})
          </h3>
          <p className={classes["amount-saved"]}>
            <span className={classes["amount"]}>
              &#x20b9;{calculateAmountSaved()}
            </span>{" "}
            saved on this order
          </p>
        </div>
        <Link to="/" className={classes["add-more-link"]}>
          Add More
        </Link>
      </div>
      <div className={classes["whole-cart"]}>
        <div>
          <CartProducts />
          <DeliveryPartnerTip />
          <DeliveryInstructions />
          <DeliveryPartnerSafety />
        </div>
        <div>
          <Price />
          <DeliveryAddress />
        </div>
      </div>
    </div>
  );
}
