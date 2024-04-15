import React, { useState } from 'react'

import classes from './SelectAddress.module.css'
import SelectAddressModal from '../SelectAddressModal/SelectAddressModal'

export default function SelectAddress() {
    const [showSelectAddressModal ,setShowSelectAddressModal] = useState(false)
  return (
    <div>
        <button className={classes['select-address-btn']} onClick={() => setShowSelectAddressModal(true)}>Select Address</button>
        {showSelectAddressModal && <SelectAddressModal closeModal={() => setShowSelectAddressModal(false)}/>}
    </div>
  )
}
