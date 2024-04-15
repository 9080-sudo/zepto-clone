import React from "react";

import classes from './DetailedProductImage.module.css'
export default function DetailedProductImage({imageUrl, name}) {
  return (
    <div className={classes["image-container"]}>
      <img src={imageUrl} alt={name} />
    </div>
  );
}
