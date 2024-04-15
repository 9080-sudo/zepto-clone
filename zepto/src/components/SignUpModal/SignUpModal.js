import React, { useState } from "react";

import classes from "./SignUpModal.module.css";

import zeptoLogo from "../../assets/LoginModal/zepto-logo.svg";
import getTheApp from "../../assets/LoginModal/get-the-app-phone.webp";
import zeptoPlayStore from "../../assets/LoginModal/app-on-google-play.svg";
import zeptoAppStore from "../../assets/LoginModal/app-on-app-store.svg";


import { isValidEmail, isValidName, isValidPassword } from "../../utils/validationcheck";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";


const SignUpModal = ({ isOpen, onClose, isSignUp }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailErr, setEmailErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const [nameErr, setNameErr] = useState('')

  const navigate = useNavigate()
  const {signUpUser} = useFirebase()

  if (!isOpen) return null;

  const closeModal = () => {
    onClose();
    setEmail("");
    setPassword("");
    setName("");
    setEmailErr('')
    setPasswordErr('')
    setNameErr('')
  };


  const handleNameBlur = e => {
    if(isValidName(name)){
        setNameErr('')
        return
    } 
    setNameErr('Enter Valid Name')
  }

  const handleEmailBlur = e => {
    console.log(email)
    if(isValidEmail(email)){
        setEmailErr('')
        return 
    }
    setEmailErr('Enter Valid email')
  }

  const handlePasswordBlur = e => {
    if(isValidPassword(password)){
        setPasswordErr('')
        return 
    }
    setPasswordErr('Minimum 8 characters, atleat 1 lowercase letter, uppercase letter, special character, number')
  }

  const handleSubmit = async e => {
    e.preventDefault() 
    
    let flag = false 
    
    if(email === ''){
        setEmailErr('Email is required')
        flag = true 
    }

    if(password === ''){
        setPasswordErr('Password is Required')
        flag = true 
    }

    if(name === ''){
        setNameErr('Name is required')
        flag = true 
    }

    if(!isValidEmail(email)){
        setEmailErr('Enter a valid email id')
        flag = true 
    }

    if(!isValidPassword(password)){
        setPasswordErr('Minimum 8 characters, atleat 1 lowercase letter, uppercase letter, special character, number')
        flag = true 
    }

    if(!isValidName(name)){
        setNameErr('Enter valid name')
        flag = true 
    }
    
    if(flag) return 
    await signUpUser(name, email, password)
    console.log('success')
    navigate('/')
  }

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
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={handleNameBlur}
                  id="name"
                  placeholder="Enter Name"
                  className={classes["generic-input"]}
                />
                {nameErr && <p className={classes['err-msg']}>{nameErr}</p>}
              </div>
              <div className={classes["input-container"]}>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={handleEmailBlur}
                  id="email"
                  placeholder="Enter Email"
                  className={classes["generic-input"]}
                />
                {emailErr && <p className={classes['err-msg']}>{emailErr}</p>}
              </div>
              <div className={classes["input-container"]}>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={handlePasswordBlur}
                  id="password"
                  className={classes["generic-input"]}
                  placeholder="Enter Password"
                />
                {passwordErr && <p className={classes['err-msg']}>{passwordErr}</p>}

              </div>
              <button
                type="submit"
                className={` ${classes["generic-input"]} ${classes["login-btn"]}`}
              >
                Sign Up
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

export default SignUpModal;
