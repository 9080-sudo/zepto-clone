import React from "react";
import { useParams } from "react-router-dom";

export default function Extra() {
  const params = useParams();
  console.log(params);
  return <div>Extra</div>;
}
