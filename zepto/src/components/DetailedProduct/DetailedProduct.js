import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";

import classes from "./DetailedProduct.module.css";

import DetailedProductImage from "../DetailedProductImage/DetailedProductImage";
import Links from "../Links/Links";
import ProductNamePriceDetails from "../ProductNamePriceDetails/ProductNamePriceDetails";
import AboutProduct from "../AboutProduct/AboutProduct";
import HowItWorks from "../HowItWorks/HowItWorks";
import CategoriesNamesLinks from "../CategoriesNamesLinks/CategoriesNamesLinks";
import Footer from "../Footer/Footer";

export default function DetailedProduct() {
  const { categoryId, subCategoryId, productId } = useParams();

  const [product, setProduct] = useState(null);
  const { getProduct } = useFirebase();

  useEffect(() => {
    const getProductHere = async () => {
      const p = await getProduct(categoryId, subCategoryId, productId);
      setProduct(p);
    };
    getProductHere();
  }, [getProduct, categoryId, subCategoryId, productId]);

  const {
    name,
    imageUrl,
    actualPrice,
    salePrice,
    description,
    id,
    Description,
    "Country of Origin": countryOfOrigin,
    "Shelf Life": shelfLife,
    "Storage Instructions": storageInstructions,
    "How to Use": howToUse,
    "Nutritional Info": nutritionalInfo,
    "Manufacturer Name": manufacturerName,
  } = product !== null ? product : {};

  return (
    <div className={classes["product-details"]}>
      {product && (
        <div>
          <div className={classes["product-details-container"]}>
            <div className={classes["left-container"]}>
              <DetailedProductImage imageUrl={imageUrl} name={name} />
              <AboutProduct
                Description={Description}
                countryOfOrigin={countryOfOrigin}
                shelfLife={shelfLife}
                storageInstructions={storageInstructions}
                howToUse={howToUse}
                nutritionalInfo={nutritionalInfo}
                manufacturerName={manufacturerName}
              />
            </div>
            <div className={classes["right-container"]}>
              <Links name={name} />
              <ProductNamePriceDetails
                id={id}
                name={name}
                actualPrice={actualPrice}
                salePrice={salePrice}
                description={description}
                imageUrl={imageUrl}
              />
              <HowItWorks />
            </div>
          </div>
          <CategoriesNamesLinks />
          <Footer />
        </div>
      )}
    </div>
  );
}
