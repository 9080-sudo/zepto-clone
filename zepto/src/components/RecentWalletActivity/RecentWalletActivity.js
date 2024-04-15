import React from "react";
import { Link } from "react-router-dom";

import { MdKeyboardArrowRight } from "react-icons/md";

import classes from "./RecentWalletActivity.module.css";
import { useFirebase } from "../../context/Firebase";
import NoRecentWalletActivity from "../NoRecentWalletActivity/NoRecentWalletActivity";
import Transaction from "../Transaction/Transaction";

export default function RecentWalletActivity() {
  const { userDetails } = useFirebase();
  let { transactions } = userDetails;
  console.log(transactions);
  transactions.sort((t1, t2) => t2.time.toDate() - t1.time.toDate())
  console.log(transactions)
  return (
    <div className={classes["recent-activity-container"]}>
      <div className={classes["recent-activity-heading-container"]}>
        <h3>Recent Activity</h3>
        <Link to="transactions" className={classes["link"]}>
          <span>See All</span>
          <MdKeyboardArrowRight className={classes["right-arrow-icon"]} />
        </Link>
      </div>
      {transactions.length === 0 && <NoRecentWalletActivity />}
      <ul className={classes['transactions']}>
        {transactions.length > 0 &&
          transactions.map((transaction) => {
            return (
              <Transaction
                key={transaction.time.toString()}
                transaction={transaction}
              />
            );
          })}
      </ul>
    </div>
  );
}
