import React from "react";

import classes from "./SubCategories.module.css";
import { useParams } from "react-router-dom";

export default function SubCategories() {
  const params = useParams();
  console.log(params);
  return <div>SubCategories</div>;
}
