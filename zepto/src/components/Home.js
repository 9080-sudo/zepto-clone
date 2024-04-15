import React, { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Banner from "./Banner";
import ExploreByCategories from "./ExploreByCategories/ExploreByCategories";
import { useFirebase } from "../context/Firebase";
import Location from "./Location/Location";
import ProductsForYou from "./ProductsForYou/ProductsForYou";
import AllProducts from "./AllProducts/AllProducts";

export default function Home() {
  // const diaRef = useRef(null);
  // const [count, setCount] = useState(1);
  // useEffect(() => {
  //   diaRef.current.showModal();
  //   setTimeout(() => {
  //     setCount(count + 1);
  //   });
  // }, []);
  const {showLocation} = useFirebase()

  useEffect(() => {
    document.title = 'Groceries Delivered in 10 minutes | Zepto'
  },[])
  
  return (
    <>
      <Header />
      <Banner />
      <ProductsForYou />
      <ExploreByCategories />
      <AllProducts />
      {showLocation && <Location />}
    </>
  );
}
