import React from "react";

import classes from "./BuildControl.module.css";
const BuildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div>{props.label}</div>
      <button onClick={props.removed} className={classes.BuildControlbutton}>
        Less
      </button>
      <button onClick={props.added} className={classes.BuildControlbutton}>
        More
      </button>
    </div>
  );
};
export default BuildControl;
