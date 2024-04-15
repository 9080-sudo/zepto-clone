import React from "react";

import classes from "./PlaceOrderModal.module.css";
import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";

export default function PlaceOrderModal({ closeModal }) {
  const { placeOrder } = useFirebase();

  const navigate = useNavigate()
  const placeOrderHere = async () => {
    await placeOrder()
    closeModal()
    navigate('/')
  }

  return (
    <div className={classes["modal-overlay"]} onClick={closeModal}>
      <div
        className={classes["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      ></div>
      <div className={classes["content"]}>
        <h3>Confirm Order</h3>
        <div className={classes["buttons-container"]}>
          <button
            className={classes["cancel-btn"]}
            type="button"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button className={classes["place-order-btn"]} onClick={placeOrderHere}>Place Order</button>
        </div>
      </div>
    </div>
  );
}
