import React from "react";

import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";

import classes from "./ProductsForYou.module.css";
import ForYouProducts from "../ForYouProducts/ForYouProducts";

export default function ProductsForYou() {
  return (
    <div>
      <div className={classes["products-for-you-name-container"]}>
        <h3>Products For You</h3>
        <Link to="/products-for-you" className={classes["see-all-link"]}>
          <span>See All</span>
          <MdKeyboardArrowRight />
        </Link>
      </div>
      <ForYouProducts />
    </div>
  );
}

