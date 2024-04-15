import React from 'react'

import classes from './DeliveryAddress.module.css'
import { useFirebase } from '../../context/Firebase'
import AddAddress from '../AddAddress/AddAddress'
import SelectAddress from '../SelectAddress/SelectAddress'
import ContinueToPayment from '../ContinueToPayment/ContinueToPayment'

export default function DeliveryAddress() {
    const {userDetails, selectedAddress} = useFirebase()
    const {addresses} = userDetails
    console.log(addresses, selectedAddress)
  return (
    <div className={classes['delivery-address-container']}>
        {(addresses === undefined || addresses.length === 0) && <AddAddress /> }
        {addresses !== undefined && addresses.length > 0 && selectedAddress === '' && <SelectAddress />}
        {addresses !== undefined && addresses.length >0 && selectedAddress !== '' && <ContinueToPayment />}
    </div>
  )
}
