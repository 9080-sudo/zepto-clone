import React, { useState } from "react";
import SearchHeader from "../SearchHeader/SearchHeader";
import { useFirebase } from "../../context/Firebase";
import Location from "../Location/Location";
import FilterProducts from "../FilterProducts/FilterProducts";
import RecentSearch from "../RecentSearch/RecentSearch";

export default function Search() {
  const { showLocation, userDetails } = useFirebase();
  const [search, setSearch] = useState("");
  if (userDetails === null)
    return (
      <>
        <SearchHeader search={search} setSearch={setSearch} />
        <FilterProducts search={search} />
      </>
    );
  const { recentSearches } = userDetails;
  return (
    <>
      <SearchHeader search={search} setSearch={setSearch} />
      {showLocation && <Location />}
      {recentSearches.length > 0 && <RecentSearch setSearch={setSearch} />}
      <FilterProducts search={search} />
    </>
  );
}
