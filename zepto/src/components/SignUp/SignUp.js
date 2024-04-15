import React, { useState } from "react";

import classes from "./SignUp.module.css";

import { FaRegUserCircle } from "react-icons/fa";
import SignUpModal from "../SignUpModal/SignUpModal";

export default function SignUp() {
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
        <p>Sign Up</p>
      </button>
      <SignUpModal isOpen={showLoginContent} onClose={closeLoginContent} isSignUp={true} />
    </>
  );
}
