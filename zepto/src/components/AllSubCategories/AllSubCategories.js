import React from "react";
import { useParams } from "react-router-dom";
import SubCategoriesSideBar from "../SubCategoriesSideBar/SubCategoriesSideBar";
import classes from './AllSubCategories.module.css'
import SubCategoryProducts from "../SubCategoryProducts/SubCategoryProducts";

export default function AllSubCategories() {
  const params = useParams();
  console.log(params);
  return (
    <div className={classes['sub-categories-container']}>
      <SubCategoriesSideBar />
      <SubCategoryProducts />
    </div>
  );
}
