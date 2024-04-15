import React from 'react'

import classes from './Banner.module.css'

import banner from '../assets/Banner/paan-corner-banner-desktop.webp'

export default function Banner() {
  return (
    <img src={banner} alt='' className={classes['banner-image']}/>
  )
}
