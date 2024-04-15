import React, { useEffect, useState } from "react";

import { useFirebase } from "../../context/Firebase";
import Category from "../Category/Category";

import classes from './Categories.module.css'
import { useLocation } from "react-router-dom";

export default function Categories() {
  const { getCategories } = useFirebase();
  const [categories, setCategories] = useState([])
  const location = useLocation() 
  // console.log(location)
  const {pathname} = location
  // console.log(pathname) 
  useEffect(() => {
    const getEachCategory = async () => {
      const ct = await getCategories();
      setCategories(ct)
      // console.log(ct)
    }
    getEachCategory()
    
  }, [getCategories]);
  // let b = `${classes['list-of-categories']} ${pathname === '/categories' ? classes['m-top']: ''}`
  // console.log(b)
  return <ul className={`${classes['list-of-categories']} ${pathname === '/categories' ? classes['m-top']: ''}`}>
    {categories.map(category => <Category key={category[0]} id={category[0]} details={category[1]} />)}
  </ul>
}
