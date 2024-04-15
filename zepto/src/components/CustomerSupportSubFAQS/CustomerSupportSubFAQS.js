import React from 'react'

import AccountMenuSection from '../AccountMenuSection/AccountMenuSection'

import classes from './CustomerSupportSubFAQS.module.css'
import SubFAQS from '../SubFAQS/SubFAQS'

export default function CustomerSupportSubFAQS() {
  return (
    <div className={classes["support-container"]}>
      <AccountMenuSection active="customer support" />
      <SubFAQS />
    </div>
  )
}
