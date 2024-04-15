import React from "react";
import Header from "../Header";
import Categories from "../Categories/Categories";
import { useFirebase } from "../../context/Firebase";
import Location from "../Location/Location";

export default function Explore() {
  const { showLocation } = useFirebase();
  return (
    <>
      <Header />
      <Categories />
      {showLocation && <Location />}
    </>
  );
}
