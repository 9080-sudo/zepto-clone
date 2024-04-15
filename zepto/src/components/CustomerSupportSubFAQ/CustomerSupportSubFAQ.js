import React from 'react'

import AccountMenuSection from '../AccountMenuSection/AccountMenuSection'

import classes from './CustomerSupportSubFAQ.module.css'
import SubFAQ from '../SubFAQ/SubFAQ'

export default function CustomerSupportSubFAQ() {
  return (
    <div className={classes["support-container"]}>
      <AccountMenuSection active="customer support" /> 
      <SubFAQ />
    </div>
  )
}
