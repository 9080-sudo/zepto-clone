import React, { useEffect, useState } from "react";

import classes from "./FirstSubCategory.module.css";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import ProductDetails from "../ProductDetails/ProductDetails";
import SubCategoriesSideBar from "../SubCategoriesSideBar/SubCategoriesSideBar";

export default function FirstSubCategory() {
  const [products, setProducts] = useState([]);

  const params = useParams();
  const { categoryId } = params;

  const { getFirstSubCategory, subCategoryName } = useFirebase();

  useEffect(() => {
    const getProducts = async () => {
      const p = await getFirstSubCategory(categoryId);
      setProducts(p);
    };
    getProducts();
  }, [categoryId, getFirstSubCategory]);

  useEffect(( ) => {
    document.title = `Buy ${subCategoryName} online`
  },[subCategoryName]) 

  return (
    <div className={classes["sub-categories-container"]}>
      <SubCategoriesSideBar />
      <div className={classes["products-container"]}>
        <h2 className={classes["buy-heading"]}>Buy {subCategoryName} online</h2>
        <ul className={classes["products"]}>
          {products.map((product) => (
            <ProductDetails key={product[0]} details={product[1]} id={product[0]}/>
          ))}
        </ul>
      </div>
    </div>
  );
}
