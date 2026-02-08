import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
const BuildControls = (props) => {
  const Controls = [
    { label: "Meat", type: "meat" },
    { label: "Salad", type: "salad" },
    { label: "Cheese", type: "cheese" },
    { label: "Bacon", type: "bacon" },
  ];
  return (
    <div className={classes.BuildControls}>
      <p>
        current price : <strong>{props.price.toFixed(2)}</strong>
      </p>
      {Controls.map((ctr) => {
        return (
          <BuildControl
            key={ctr.label}
            label={ctr.label}
            added={() => props.ingredientAdded(ctr.type)}
            removed={() => props.ingredientRemoved(ctr.type)}
            disabled={props.disabled[ctr.type]}
          />
        );
      })}

      <button
        className={classes.orderButton}
        disabled={!props.purchasable}
        onClick={props.ordered}
      >
        ORDER NOW
      </button>
    </div>
  );
};
export default BuildControls;
