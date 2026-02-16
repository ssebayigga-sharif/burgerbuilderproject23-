import React, { Component } from "react";

import Auxi from "../../../hoc/Auxi";
import Button from "../../UI/Button/Button";
const OrderSummary = (props) => {
  const ingredientSummary = Object.keys(props.ingredients).map((ingKey) => {
    return (
      <li key={ingKey}>
        <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
        {props.ingredients[ingKey]}
      </li>
    );
  });
  return (
    <div>
      <Auxi>
        <h3> Your order</h3>
        <p>A delicious burger with the following ingredients:</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price : {props.price}</strong>
        </p>
        <p>continue to checkout</p>
        <Button btntype="Danger" clicked={props.purchaseCancelled}>
          CANCEL
        </Button>
        <Button btntype="Success" clicked={props.purchaseContinued}>
          CONTINUE
        </Button>
      </Auxi>
    </div>
  );
};

export default OrderSummary;
