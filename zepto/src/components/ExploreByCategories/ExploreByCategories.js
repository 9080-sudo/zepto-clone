import React from "react";

import classes from "./ExploreByCategories.module.css";

import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Categories from "../Categories/Categories";

export default function ExploreByCategories() {
  return (
    <>
      <div className={classes['heading-see-all-link']}>
        <h3>Explore By Categories</h3>
        <Link to="/categories" className={classes['see-all-link']}>
          See All <MdKeyboardArrowRight />
        </Link>
      </div>
      <Categories />
    </>
  );
}
