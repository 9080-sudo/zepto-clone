import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { LiaGreaterThanSolid } from "react-icons/lia";

import { useFirebase } from "../../context/Firebase";

import classes from "./Links.module.css";

export default function Links({ name }) {
  const { categoryId, subCategoryId } = useParams();
  const { getSubCategory } = useFirebase();
  const [subCategory, setSubCategory] = useState({});
  useEffect(() => {
    const getSubCategoryHere = async () => {
      const subC = await getSubCategory(categoryId, subCategoryId);
      setSubCategory(subC);
    };
    getSubCategoryHere();
  }, [getSubCategory, categoryId, subCategoryId]);

  return (
    <div className={classes["links-container"]}>
      <Link to="/" className={classes["link"]}>
        Home
      </Link>
      <LiaGreaterThanSolid />
      <Link
        to={`/categories/${categoryId}/subcategories/${subCategoryId}`}
        className={classes["link"]}
      >
        {subCategory.name}
      </Link>
      <LiaGreaterThanSolid />
      <p className={classes['name']}>{name}</p>
    </div>
  );
}
