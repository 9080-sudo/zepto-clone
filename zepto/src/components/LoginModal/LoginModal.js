import React, { useEffect, useState } from "react";

import classes from "./LoginModal.module.css";

import zeptoLogo from "../../assets/LoginModal/zepto-logo.svg";
import getTheApp from "../../assets/LoginModal/get-the-app-phone.webp";
import zeptoPlayStore from "../../assets/LoginModal/app-on-google-play.svg";
import zeptoAppStore from "../../assets/LoginModal/app-on-app-store.svg";
import { useFirebase } from "../../context/Firebase";
import { useNavigate } from "react-router-dom";
import { isValidEmail, isValidPassword } from "../../utils/validationcheck";

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [emailErr, setEmailErr] = useState("INITIAL");
  const [passwordErr, setPasswordErr] = useState("INITIAL");
  const [btnDisabled, setBtnDisabled] = useState(true);
  const { signInUser } = useFirebase();

  const navigate = useNavigate();

  useEffect(() => {
    if(emailErr === '' && passwordErr === ''){
      setBtnDisabled(false)
    }else{
      setBtnDisabled(true)
    }
  }, [emailErr, passwordErr]);

  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
    setEmail("");
    setPassword("");
    setError("");
    setEmailErr("INITIAL");
    setPasswordErr("INITIAL");
  };

  const handleEmailBlur = (e) => {
    // console.log(email);
    if (isValidEmail(email)) {
      setEmailErr("");
      return 
    }
    setEmailErr("Enter Valid email");
  };

  const handlePasswordBlur = () => {
    // if(password !== ''){
    //   setPasswordErr('')
    // }else{
    //   setPasswordErr('*Required')
    // }
    if (password === "") {
      setPasswordErr("*Required");
    } else if (!isValidPassword(password)) {
      setPasswordErr(
        "Minimum 8 characters, atleast 1 lowercase letter, 1 uppercase letter, 1 special character, 1 number"
      );
    } else {
      setPasswordErr("");
      return true;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    let flag = false;

    if (password === "") {
      setPasswordErr("*Required");
      flag = true;
    }

    if (email === "") {
      setEmailErr("*Required");
      flag = true;
    }

    if (isValidEmail(email) === false) {
      setEmailErr("Enter valid email");
      flag = true;
    }

    if (flag) return;

    let isLoggedIn = await signInUser(email, password);

    if (isLoggedIn) navigate("/");
    else {
      setError("Invalid Email or Password");
    }
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
            <form onSubmit={handleSubmit}>
              <div className={classes["input-container"]}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  placeholder="Enter Email"
                  onBlur={handleEmailBlur}
                  className={classes["generic-input"]}
                />
                {emailErr === 'INITIAL' && <p className={classes["error-msg"]}></p>}
                {emailErr !== 'INITIAL' && <p className={classes["error-msg"]}>{emailErr}</p>}
              </div>
              <div className={classes["input-container"]}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className={classes["generic-input"]}
                  onBlur={handlePasswordBlur}
                  placeholder="Enter Password"
                />
                {passwordErr === 'INITIAL' && <p className={classes["error-msg"]}></p>}
                {passwordErr !== 'INITIAL' && (
                  <p className={classes["error-msg"]}>{passwordErr}</p>
                )}
              </div>
              <button
                type="submit"
                className={` ${classes["generic-input"]} ${
                  btnDisabled
                    ? classes["disabled-login-btn"]
                    : classes["login-btn"]
                }`}
                disabled={btnDisabled}
              >
                Continue
              </button>
              {!error && <p className={classes["error-msg"]}></p>}
              {error && <p className={classes["error-msg"]}>{error}</p>}
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

export default LoginModal;
