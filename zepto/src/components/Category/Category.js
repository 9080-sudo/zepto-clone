import React from "react";
import { Link } from "react-router-dom";

import classes from './Category.module.css'

export default function Category({ id, details }) {
  const { imageUrl, name } = details;
  let className = 'list-item'
  if(name === 'Fruits & Vegetables')
    className = 'specific-list-item'
  return (
    <li>
      <Link to={`/categories/${id}`}>
        <img src={imageUrl} alt={name} className={classes[className]}/>
      </Link>
    </li>
  );
}
