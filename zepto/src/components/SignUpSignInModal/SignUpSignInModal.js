import React, { useState } from "react";

import classes from "./SignUpSignInModal.module.css";

import zeptoLogo from "../../assets/LoginModal/zepto-logo.svg";
import getTheApp from "../../assets/LoginModal/get-the-app-phone.webp";
import zeptoPlayStore from "../../assets/LoginModal/app-on-google-play.svg";
import zeptoAppStore from "../../assets/LoginModal/app-on-app-store.svg";

const SignUpSignInModal = ({ isOpen, onClose, isSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState('')
  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
    setEmail("");
    setPassword("");
    setName('')
  };
  
  return (
    <div className={classes["modal-overlay"]} onClick={closeModal}>
      <div
        className={classes["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={classes["modal-close-button"]} onClick={closeModal}>
          &times;
        </button>
        <div className={classes["login-container"]}>
          <div className={classes["login-panel"]}>
            <img src={zeptoLogo} alt="zepto-logo" />
            <h1 className={classes["delivery-time"]}>
              Groceries delivered in 10 minutes
            </h1>
            <form>
              {isSignUp && (
                <div className={classes["input-container"]}>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="name"
                    placeholder="Enter Name"
                    className={classes["generic-input"]}
                  />
                </div>
              )}
              <div className={classes["input-container"]}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Enter Email"
                  className={classes["generic-input"]}
                />
              </div>
              <div className={classes["input-container"]}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className={classes["generic-input"]}
                  placeholder="Enter Password"
                />
              </div>
              <button
                type="submit"
                className={` ${classes["generic-input"]} ${classes["login-btn"]}`}
              >
                Login
              </button>
            </form>
            <div className={classes["agreement-center"]}>
              <p className={classes["agreement"]}>
                By continuing you agree to our
              </p>
              <p className={classes["agreement"]}>
                <a href="#" className={classes["agreement-link"]}>
                  Terms of service
                </a>{" "}
                &{" "}
                <a href="#" className={classes["agreement-link"]}>
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
          <div className={classes["get-the-app-panel"]}>
            <img src={getTheApp} alt="get-the-app-icon" />
            <h3 className={classes["app-text"]}>
              Order faster & easier everytime
            </h3>
            <h5 className={classes["app-name"]}>with the Zepto App</h5>
            <img
              src={zeptoPlayStore}
              alt="get on play store"
              className={classes["get-on-store"]}
            />
            <img
              src={zeptoAppStore}
              alt="get on app store"
              className={classes["get-on-store"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpSignInModal;
