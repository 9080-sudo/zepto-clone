import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import classes from "./SubCateogryProducts.module.css";
import ProductDetails from "../ProductDetails/ProductDetails";

export default function SubCategoryProducts() {
  const [products, setProducts] = useState([]);

  const params = useParams();
  const { categoryId, subCategoryId } = params;
  console.log(params);
  const { getSubCategoryProducts, subCategoryName } = useFirebase();

  useEffect(() => {
    const getProducts = async () => {
      const p = await getSubCategoryProducts(categoryId, subCategoryId);
      setProducts(p);
    };
    getProducts();
  }, [categoryId, getSubCategoryProducts, subCategoryId]);

  useEffect(( ) => {
    document.title = `Buy ${subCategoryName} online`
  },[subCategoryName])

  return (
    <div className={classes["products-container"]}>
      <h2 className={classes["buy-heading"]}>Buy {subCategoryName} online</h2>
      <ul className={classes["products"]}>
        {products.map((product) => (
          <ProductDetails key={product[0]} details={product[1]} id={product[0]}/>
        ))}
      </ul>
    </div>
  );
}
