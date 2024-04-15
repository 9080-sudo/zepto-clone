import React, { useState } from "react";

import classes from "./Location.module.css";

import { IoLocationOutline } from "react-icons/io5";
import { useFirebase } from "../../context/Firebase";

export default function Location() {
  const { changeLocation, closeShowLocation, location } = useFirebase();

  const [tempLocation, setTempLocation] = useState(location)

  const handleSubmit = e => {
    e.preventDefault()
    if(tempLocation === ''){
        return
    }
    changeLocation(tempLocation)
    closeShowLocation()
  }
  return (
    <div className={classes["modal-overlay"]}>
      <div
        className={classes["modal-content"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={classes["location-container"]}>
          <IoLocationOutline className={classes["location-icon"]} />
          <div>
            <p>
              To deliver as quickly as possible, we would like your current
              location
            </p>
            <form className={classes['location-input-container']} onSubmit={handleSubmit}>
              <input
                type="text"
                value={tempLocation}
                onChange={(e) => setTempLocation(e.target.value)}
                className={classes["location-input"]}
                placeholder="Enter Location"
              />
              <button type="submit" className={classes['submit-location']}>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
