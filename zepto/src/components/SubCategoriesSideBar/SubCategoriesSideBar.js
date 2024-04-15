import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFirebase } from "../../context/Firebase";
import classes from "./SubCategoriesSideBar.module.css";

export default function SubCategoriesSideBar() {
  const [subCategories, setSubCategories] = useState([]);
  const params = useParams();
  let { categoryId, subCategoryId } = params;
  console.log(params);
  const subCategoryIdRef = useRef(subCategoryId);
  const { getSubCategories, changeSubCategoryName } = useFirebase();
  // changeCategoryId(categoryId)
  console.log(categoryId, 1234, subCategoryId, subCategoryIdRef.current);
  useEffect(() => {
    async function getSubCategoriesHere() {
      const subC = await getSubCategories(categoryId);
      console.log(subC, 'subcategories')
      if (subCategoryId === undefined) {
        subCategoryIdRef.current = subC[0][0];
        changeSubCategoryName(subC[0][1].name)
      }else{
        let subCategory = subC.find(sub => sub[0] === subCategoryId)
        changeSubCategoryName(subCategory[1].name)
      }
      setSubCategories(subC);
      console.log(subC, subCategoryId);
    }
    getSubCategoriesHere();
  }, [categoryId, getSubCategories, subCategoryId, changeSubCategoryName]);

  useEffect(() => {
    subCategoryIdRef.current = subCategoryId;
  }, [subCategoryId]);

  return (
    <div className={classes['l-o-s-container']}>
      <ul className={classes["list-of-sub-categories"]}>
        {subCategories.map((subCategory) => (
          <li key={subCategory[0]}>
            <Link
              to={`/categories/${categoryId}/subcategories/${subCategory[0]}`}
              className={`${classes["sub-category"]} ${
                subCategory[0] === subCategoryIdRef.current
                  ? classes["active-sub-category"]
                  : ""
              } `}
            >
              <img
                src={subCategory[1].imageUrl}
                alt={subCategory[1].name}
                className={classes["sub-category-image"]}
              />
              <span className={classes["sub-cateogory-name"]}>
                {subCategory[1].name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
