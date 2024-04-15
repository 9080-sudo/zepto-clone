import React, { useEffect, useState } from "react";
import { useFirebase } from "../../context/Firebase";
import { Link } from "react-router-dom";

import classes from "./CategoriesNamesLinks.module.css";

export default function CategoriesNamesLinks() {
  const [categories, setCategories] = useState([]);
  const { getCategories } = useFirebase();
  useEffect(() => {
    const getCategoriesHere = async () => {
      const c = await getCategories();
      console.log(c);
      setCategories(c);
    };
    getCategoriesHere();
  }, [getCategories]);
  return (
    <div className={classes['categories-links-container']}>
      <h3>Categories</h3>
      <ul className={classes["categories-links"]}>
        {categories.map((category) => {
          console.log(category[0], category[1].name)
          return (
            <li className={classes['category-link-item']}>
              <Link to={`/categories/${category[0]}`} className={classes['category-link']}>{category[1].name}</Link>
            </li>
          );
        })}
      </ul>
      <hr className={classes['line']}/>
    </div>
  );
}
