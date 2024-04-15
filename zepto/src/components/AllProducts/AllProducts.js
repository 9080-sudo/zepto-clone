import React, { useEffect, useState } from 'react'
import { useFirebase } from '../../context/Firebase'
import ProductDetails from '../ProductDetails/ProductDetails'

import classes from './AllProducts.module.css'

export default function AllProducts() {
    const [products, setProducts] = useState([])

    const {getAllProducts} = useFirebase()

    useEffect(() => {
        const getAllProductsHere = async () => {
            const allProducts = await getAllProducts()
            console.log(allProducts)
            setProducts(allProducts)
        }
        getAllProductsHere()
    }, [getAllProducts])

  return (
    <ul className={classes['all-products-container']}>{products.map((product) => (
        <ProductDetails key={product.id} id={product[0]} details={product[1]} width="209px"/>
      ))}</ul>
  )
}
