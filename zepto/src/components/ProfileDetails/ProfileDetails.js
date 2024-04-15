import React, { useEffect, useState } from "react";

import { useFirebase } from "../../context/Firebase";

import classes from "./ProfileDetails.module.css";
import { useNavigate } from "react-router-dom";
import DeleteAccountModal from "../DeleteAccountModal/DeleteAccountModal";

export default function ProfileDetails() {
  const { userDetails, changeName } = useFirebase();
  const { name: n, email } = userDetails;

  const [name, setName] = useState(n || "");
  const [nameErr, setNameErr] = useState(n === ''? "INITIAL": '');
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);

  const isValidName = (name) => {
    const nameRegex = /^(?=.*[a-zA-Z])[a-zA-ZÀ-ÿ-']+(\s[a-zA-ZÀ-ÿ-']+)*$/;
    return nameRegex.test(name);
  };

  const handleNameBlur = () => {
    if (name === "") {
      setNameErr("*Required");
      return true;
    } else if (!isValidName(name)) {
      setNameErr("Only Letters are allowed");
      return true;
    } else {
      setNameErr("");
      return false;
    }
  };

  useEffect(() => {
    console.log('exectued')
    if (nameErr === "") {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
  }, [nameErr]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (handleNameBlur()) return;
    await changeName(name);
  };

  return (
    <div className={classes["profile-container"]}>
      <form className={classes["details-form"]} onSubmit={handleSubmit}>
        <div className={classes["input-container"]}>
          <label htmlFor="name" className={classes["input-label"]}>
            Name*
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="name"
            className={classes["input-element"]}
            onBlur={handleNameBlur}
          />
          <p className={classes["name-err"]}>
            {nameErr === "INITIAL" ? "" : nameErr}
          </p>
        </div>
        <div className={`${classes["input-container"]} ${classes["m-top"]}`}>
          <label htmlFor="email" className={classes["input-label"]}>
            Email Address*
          </label>
          <input
            type="email"
            value={email}
            id="email"
            className={`${classes["input-element"]} ${classes["disabled-input-element"]}`}
            disabled
          />
        </div>
        <div className={classes["button-container"]}>
          <button
            className={`${
              btnDisabled ? classes["disabled-btn"] : classes["submit-btn"]
            }`}
            disabled={btnDisabled}
          >
            Submit
          </button>
        </div>
      </form>
      <hr className={classes["line"]} />
      <div className={classes["delete-account-container"]}>
        <button
          className={classes["delete-account-btn"]}
          onClick={() => setShowDeleteAccountModal(true)}
        >
          Delete Account
        </button>
        <p>
          Deleting your account will remove all your orders, wallet amount and
          any active referral
        </p>
      </div>
      {showDeleteAccountModal && (
        <DeleteAccountModal
          closeDeleteAccountModal={() => setShowDeleteAccountModal(false)}
        />
      )}
    </div>
  );
}
