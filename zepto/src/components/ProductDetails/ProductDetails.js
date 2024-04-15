import React from "react";

import classes from "./ProductDetails.module.css";

import { useFirebase } from "../../context/Firebase";

import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProductDetails({ details, id, width }) {
  const {
    name,
    imageUrl,
    actualPrice,
    salePrice,
    description,
    categoryId,
    subCategoryId,
  } = details;
  const discount = parseInt(((actualPrice - salePrice) / actualPrice) * 100);
  // console.log(name,actualPrice, salePrice)
  // console.log(discount, 'discount')
  const { addItemToCart, cart } = useFirebase();
  // console.log(categoryId, subCategoryId, id, 'category subcategory id')
  // let productId = `${categoryName}-${subCategoryName}-${id}`;
  let existingProductIdx = cart.findIndex((product) => {
    // console.log("at product details", productId, product.id);
    return product.id === details.id;
  });

  let w = "211px";
  if (width) {
    w = width;
  }
  let qty = 0;

  if (existingProductIdx !== -1) {
    qty = cart[existingProductIdx].quantity;
  }

  return (
    <Link
      to={`/categories/${categoryId}/subcategories/${subCategoryId}/product/${id}`}
      className={classes['link']}
    >
      <div className={classes["product"]} style={{ width: w }}>
        <div>
          {discount !== 0 && (
            <p className={classes["discount"]}>{discount}% Off</p>
          )}
          <div className={classes["product-image-container"]}>
            <img
              src={imageUrl}
              alt={name}
              className={classes["product-image"]}
            />
          </div>
          <p className={classes["product-name"]}>{name}</p>
          <p className={classes["product-description"]}>{description}</p>
        </div>
        <div className={classes["price-container"]}>
          <div>
            {discount !== 0 && (
              <>
                <p className={classes["actual-price"]}>&#x20b9;{actualPrice}</p>
                <p className={classes["sale-price"]}>&#x20b9;{salePrice}</p>
              </>
            )}
            {discount === 0 && <p>&#x20b9;{actualPrice}</p>}
          </div>
          {qty === 0 && (
            <button
              className={classes["add-btn"]}
              onClick={(e) => {
                e.preventDefault();
                addItemToCart(details.id, details, 1);
              }}
            >
              Add
            </button>
          )}
          {qty !== 0 && (
            <div className={classes["change-quantity-container"]}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItemToCart(details.id, details, -1);
                }}
                className={classes["change-quantity-btn"]}
              >
                <FaMinus />
              </button>
              <span className={classes["qty"]}>{qty}</span>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addItemToCart(details.id, details, 1);
                }}
                className={classes["change-quantity-btn"]}
              >
                <FaPlus />
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
