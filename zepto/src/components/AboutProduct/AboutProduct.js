import React from "react";

import classes from './AboutProduct.module.css'

export default function AboutProduct({
  Description,
  countryOfOrigin,
  shelfLife,
  storageInstructions,
  howToUse,
  nutritionalInfo,
  manufacturerName,
}) {
  return (
    <div className={classes['about-product-container']}>
      <h3>About Product</h3>
      <ul className={classes['about-product-details-list']}>
        {Description && <li>Description: {Description}</li>}
        {countryOfOrigin && <li>Country of Origin: {countryOfOrigin}</li>}
        {shelfLife && <li>Shelf Life: {shelfLife}</li>}
        {storageInstructions && <li>Storage Instructions: {storageInstructions}</li>}
        {howToUse && <li>How to Use: {howToUse}</li>}
        {nutritionalInfo && <li>Nutritional Info: {nutritionalInfo}</li>}
        {manufacturerName && <li>Manufacturer Name: {manufacturerName}</li>}
      </ul>
    </div>
  );
}
