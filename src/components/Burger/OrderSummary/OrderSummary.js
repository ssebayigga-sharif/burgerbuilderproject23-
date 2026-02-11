import React, { Component } from "react";

import Auxi from "../../../hoc/Auxi";
import Button from "../../UI/Button/Button";
class OrderSummary extends Component {
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (ingKey) => {
        return (
          <li key={ingKey}>
            <span style={{ textTransform: "capitalize" }}>{ingKey}</span>:{" "}
            {this.props.ingredients[ingKey]}
          </li>
        );
      },
    );
    return (
      <div>
        <Auxi>
          <h3> Your order</h3>
          <p>A delicious burger with the following ingredients:</p>
          <ul>{ingredientSummary}</ul>
          <p>
            <strong>Total Price : {this.props.price}</strong>
          </p>
          <p>continue to checkout</p>
          <Button btntype="Danger" clicked={this.props.purchaseCancelled}>
            CANCEL
          </Button>
          <Button btntype="Success" clicked={this.props.purchaseContinued}>
            CONTINUE
          </Button>
        </Auxi>
      </div>
    );
  }
}

export default OrderSummary;
