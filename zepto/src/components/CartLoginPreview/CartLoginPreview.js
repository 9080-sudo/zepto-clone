import React, { useState } from "react";

import LoginModal from "../LoginModal/LoginModal";

import classes from './CartLoginPreview.module.css'

export default function CartLoginPreview() {
  const [showLoginContent, setShowLoginContent] = useState(false);

  const openLoginContent = () => {
    setShowLoginContent(true);
  };

  const closeLoginContent = () => {
    setShowLoginContent(false);
  };

  return (
    <>
      <button onClick={openLoginContent} className={classes["login-btn"]}>
        Login
      </button>
      <LoginModal isOpen={showLoginContent} onClose={closeLoginContent} />
    </>
  );
}
