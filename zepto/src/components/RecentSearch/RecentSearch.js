import React from "react";
import { useFirebase } from "../../context/Firebase";

import classes from './RecentSearch.module.css'

export default function RecentSearch({ setSearch }) {
  const { userDetails } = useFirebase();
  if(userDetails === null) return <></>;
  const { recentSearches } = userDetails;
  console.log('recent search', recentSearches)
  return (
    <div className={classes['recent-search']}>
      <h3>RecentSearch</h3>
      <ul className={classes['recent-search-list']}>
        {recentSearches.map((s, idx) => (
          <li key={idx} onClick={() => setSearch(s)} className={classes['search']}>
            {s}
          </li>
        ))}
      </ul>
    </div>
  );
}
