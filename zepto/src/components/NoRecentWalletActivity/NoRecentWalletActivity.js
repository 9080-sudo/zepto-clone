import React from 'react'

import coneIcon from '../../assets/NoRecentWalletActivity/cone-icon.avif'

import classes from './NoRecentWalletActivity.module.css'

export default function NoRecentWalletActivity() {
  return (
    <div className={classes['no-recent-activity-container']}>
        <img src={coneIcon} alt='No Transactions' className={classes['no-transaction-image']}/>
        <h3 className={classes['heading']}>No Transactions Yet</h3>
        <p className={classes['descr']}>To see the transactions add the Zepto cash in your wallet</p>
    </div>
  )
}
