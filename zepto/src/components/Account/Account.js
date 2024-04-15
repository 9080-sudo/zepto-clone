import React, { useEffect } from "react";
import Header from "../Header";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import Location from "../Location/Location";

export default function Account() {
  const location = useLocation();

  // console.log(location)

  const { isLoggedIn, showLocation } = useFirebase();

  useEffect(() => {
    document.title = "Account | Zepto";
  }, []);

  if (!isLoggedIn) {
    console.log("navigating");
    return <Navigate to="/" />;
  }

  return (
    <>
      <Header pathname={location.pathname} />
      {showLocation && <Location />}
      {/* <button onClick={signOutUser}>sign out</button>
      <Link to="orders">Orders</Link> */}
      <Outlet />
    </>
  );
}
