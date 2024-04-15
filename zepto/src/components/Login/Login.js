import React, { useState } from "react";

import classes from "./Login.module.css";

import { FaRegUserCircle } from "react-icons/fa";
import SignUpSignInModal from "../SignUpSignInModal/SignUpSignInModal";
import LoginModal from "../LoginModal/LoginModal";

export default function Login() {
  const [showLoginContent, setShowLoginContent] = useState(false);

  const openLoginContent = () => {
    setShowLoginContent(true);
  };

  const closeLoginContent = () => {
    setShowLoginContent(false);
  };

  return (
    <>
      <button className={classes["user-login"]} onClick={openLoginContent}>
        <FaRegUserCircle className={classes["user-icon"]} />
        <p>Login</p>
      </button>
      <LoginModal isOpen={showLoginContent} onClose={closeLoginContent} />
    </>
  );
}
