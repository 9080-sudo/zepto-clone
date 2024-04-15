import React, { useState } from "react";

import AccountMenuSection from "../AccountMenuSection/AccountMenuSection";

import classes from "./Transactions.module.css";
import { useFirebase } from "../../context/Firebase";
import Transaction from "../Transaction/Transaction";
import NoRecentWalletActivity from "../NoRecentWalletActivity/NoRecentWalletActivity";

let transactionTypes = ["all", "debits", "credits"];

export default function Transactions() {
  const [transactionType, setTransactionType] = useState("all");
  const { userDetails } = useFirebase();
  const { transactions } = userDetails;

  const sortTransactions = (transacs) => {
    return transacs.sort((t1, t2) => t2.time.toDate() - t1.time.toDate());
  };

  let currentTransactions;
  if (transactionType === "all") {
    currentTransactions = sortTransactions(transactions);
  } else if (transactionType === "debits") {
    currentTransactions = transactions.filter((tr) => tr.isCredit === false);
    currentTransactions = sortTransactions(currentTransactions);
  } else {
    currentTransactions = transactions.filter((tr) => tr.isCredit === true);
    console.log(currentTransactions);
    currentTransactions = sortTransactions(currentTransactions);
  }

  return (
    <div className={classes["transactions-container"]}>
      <AccountMenuSection active="wallet" />
      <div className={classes["transactions"]}>
        <div className={classes["transaction-types-container"]}>
          <ul className={classes["transaction-types"]}>
            {transactionTypes.map((tType) => (
              <li
                className={`${classes["transaction-type"]} ${
                  transactionType === tType ? classes["active"] : ""
                }`}
                onClick={() => setTransactionType(tType)}
              >
                {tType[0].toUpperCase() + tType.substring(1)}
              </li>
            ))}
          </ul>
        </div>
        <div className={classes['no-activity']}>
          {currentTransactions.length === 0 && <NoRecentWalletActivity />}
        </div>
        {currentTransactions.length > 0 && (
          <ul className={classes["transactions-2"]}>
            {currentTransactions.map((transaction) => (
              <Transaction
                key={transaction.time.toString()}
                transaction={transaction}
              />
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
