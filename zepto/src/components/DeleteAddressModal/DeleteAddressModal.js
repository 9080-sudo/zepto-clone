import React from "react";

import classes from "./DeleteAddressModal.module.css";
import { useFirebase } from "../../context/Firebase";

export default function DeleteAddressModal({ closeDeleteAddressModal, id }) {
  const { deleteAddress } = useFirebase();
  const closeModal = (e) => {
    e.preventDefault();
    closeDeleteAddressModal();
  };

  const deleteA = e => {
    e.preventDefault() 
    deleteAddress(id)
  }

  return (
    <div className={classes["modal-overlay"]} onClick={closeModal}>
      <div
        className={classes["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <form className={classes["delete-form"]} onSubmit={deleteA}>
          <h3 className={classes["description"]}>
            Are you sure you want to delete this address
          </h3>
          <div className={classes["btns-container"]}>
            <button className={classes["delete-btn"]}>Delete</button>
            <button
              className={classes["cancel-btn"]}
              type="button"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
