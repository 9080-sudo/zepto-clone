import React from 'react'

import emptyOrderBag from '../../assets/Orders/empty-bag.avif'
import { Link } from 'react-router-dom'

import classes from './NoOrdersFound.module.css'

export default function NoOrdersFound() {
  return (
    <div className={classes['no-orders-found-container']}>
        <img src={emptyOrderBag} alt='No Orders' className={classes['no-orders-image']}/>
        <p className={classes['description']}>No orders yet</p>
        <Link to="/" className={classes['link']}>
            Browse Products
        </Link>
    </div>
  )
}
