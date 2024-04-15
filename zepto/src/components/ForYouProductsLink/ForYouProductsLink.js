import React, { useEffect, useState } from "react";

import { useFirebase } from "../../context/Firebase";

import ProductDetails from "../ProductDetails/ProductDetails";

import classes from "./ForYouProductsLink.module.css";
import Header from "../Header";
import HowItWorksLargeView from "../HowItWorksLargeView/HowItWorksLargeView";
import CategoriesNamesLinks from "../CategoriesNamesLinks/CategoriesNamesLinks";
import Footer from "../Footer/Footer";
import Location from "../Location/Location";

export default function ForYouProductsLink() {
  const { getProductsForYou, showLocation } = useFirebase();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductsForYouHere = async () => {
      const pfu = await getProductsForYou();
      setProducts(pfu);
    };
    getProductsForYouHere();
  }, [getProductsForYou]);
  return (
    <>
      <Header />
      <h4 className={classes["heading"]}>Products For You</h4>
      <ul className={classes["products-for-you-container"]}>
        {products.map((product) => {
          console.log(product[1]);
          return (
            <ProductDetails
              key={product[0]}
              id={product[1].pId}
              details={product[1]}
              width="209px"
            />
          );
        })}
      </ul>
      <HowItWorksLargeView />
      <CategoriesNamesLinks />
      <Footer />
      {showLocation && <Location />}
    </>
  );
}
