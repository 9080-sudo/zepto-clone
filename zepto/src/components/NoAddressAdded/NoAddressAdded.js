import React from 'react'

import NoAddress from '../../assets/Address/cone-icon.avif'

import classes from './/NoAddressAdded.module.css'

export default function NoAddressAdded() {
  return (
    <div className={classes['no-address-added-container']}>
        <img src={NoAddress} alt="No Address Added" />
        <h3 className={classes['heading']}>No Address Added</h3>
        <p className={classes['description']}>To see the saved address here, add your work or home address</p>
    </div>
  )
}
