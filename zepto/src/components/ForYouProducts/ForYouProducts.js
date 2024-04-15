import React, { useEffect, useState } from "react";

import classes from "./ForYouProducts.module.css";

import { useFirebase } from "../../context/Firebase";

import ProductForYou from "../ProductForYou/ProductForYou";

export default function ForYouProducts() {
  const { getProductsForYou } = useFirebase();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProductsForYouHere = async () => {
      const pfu = await getProductsForYou();
      setProducts(pfu);
    };
    getProductsForYouHere();
  }, [getProductsForYou]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = 6; // Number of total items in the carousel
  const visibleItems = 6; // Number of visible items in the carousel

  const moveLeft = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? prevIndex : prevIndex - 1
    );
  };

  const moveRight = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalItems - 1 ? prevIndex : prevIndex + 1
    );
  };

  const carouselContentStyle = {
    transform: `translateX(${-(currentIndex * (100 / visibleItems))}%)`,
  };

  return (
    <div className={classes["carousel"]}>
      <div className={classes["carousel-content"]} style={carouselContentStyle}>
        {products.map((product) => (
          <ProductForYou
            key={product[0]}
            id={product[0]}
            details={product[1]}
          />
        ))}
      </div>
      <div
        className={`${classes["carousel-btn"]} ${classes["left"]}`}
        onClick={moveLeft}
      >
        &#10094;
      </div>
      <div
        className={`${classes["carousel-btn"]} ${classes["right"]}`}
        onClick={moveRight}
      >
        &#10095;
      </div>
    </div>
  );
}
