import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div
        style={{
          width: "100%",

          margin: "auto",
        }}
      >
        <Burger ingredients={props.ingredients} />
        <Button btntype="Danger" clicked={props.checkoutCancelled}>
          CANCEL
        </Button>
        <Button btntype="Success" clicked={props.checkoutContinued}>
          CONTINUE
        </Button>
      </div>
    </div>
  );
};

export default CheckoutSummary;
