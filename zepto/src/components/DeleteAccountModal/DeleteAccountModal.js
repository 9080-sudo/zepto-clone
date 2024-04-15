import React from "react";

import classes from "./DeleteAccountModal.module.css";

import icon from "../../assets/Profile/t-img-suc.png";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
export default function DeleteAccountModal({ closeDeleteAccountModal }) {
  const navigate = useNavigate();
  const { deleteAccount } = useFirebase();
  const deleteUserAccount = async () => {
    await deleteAccount();
    navigate("/");
  };
  return (
    <div className={classes["modal-overlay"]} onClick={closeDeleteAccountModal}>
      <div
        className={classes["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes["modal-container"]}>
          <img
            src={icon}
            alt="sad to see you go"
            className={classes["sad-to-go-icon"]}
          />
          <h3 className={classes["heading"]}>Sad To See You Go</h3>
          <p className={classes["description"]}>
            You will lose your past order details. Would you still like to
            proceed?
          </p>
          <div className={classes["buttons-container"]}>
            <button
              onClick={closeDeleteAccountModal}
              className={classes["dont-delete-btn"]}
            >
              No, Thank You
            </button>
            <button
              className={classes["continue-btn"]}
              onClick={deleteUserAccount}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
