import React, { useEffect, useRef, useState } from "react";

import { useFirebase } from "../../context/Firebase";

import ProductDetails from "../ProductDetails/ProductDetails";

import classes from "./FilterProducts.module.css";

export default function FilterProducts({ search }) {
  const debounceTimeout = useRef(null);

  const { allProducts, getAllProducts, addToRecentSearches, userDetails} = useFirebase();
  
  
  
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const debounceFunction = async () => {
      clearTimeout(debounceTimeout.current);
      debounceTimeout.current = setTimeout(() => {
        const filterProducts = (products, search) => {
          products = products.filter((p) => {
            // console.log(p);
            return p[1].name.toLowerCase().includes(search.toLowerCase());
          });
          //console.log(products,' all products')
          setFilteredProducts(products);
        };
        const getFilteredProducts = async () => {
          // console.log(search, 'search')
          if (allProducts.length === 0) {
            const p = await getAllProducts();
            filterProducts(p, search);
          } else {
            filterProducts(allProducts, search);
          }
          if(search !== ''){
            await addToRecentSearches(search)
          }
        };
        getFilteredProducts();
      }, 500);
    };

    debounceFunction();

    // Cleanup function to clear timeout on unmount or when inputValue changes
    return () => {
      clearTimeout(debounceTimeout.current);
    };
  }, [search, allProducts]);

  let cl = '', recentSearch;
  if(userDetails === null) cl =  classes['m-top']
  else{
    const {recentSearches} = userDetails
    recentSearch = recentSearches
    if(recentSearch.length === 0) cl = classes['m-top']
  }

  return (
    <>
      {filteredProducts.length === 0 && <div className={classes['no-products']}>
        <p>There are no matching products with your search</p>
        </div>}
      {filteredProducts.length > 0 && (
        <ul className={`${classes["filter-products-container"]} ${cl}`}>
          {filteredProducts.map((product) => (
            <ProductDetails
              key={product[1].id}
              id={product[0]}
              details={product[1]}
              width="209px"
            />
          ))}
        </ul>
      )}
    </>
  );
}
