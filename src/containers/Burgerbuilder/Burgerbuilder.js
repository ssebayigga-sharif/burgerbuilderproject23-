import React, { Component, useEffect, useState } from "react";
import Auxi from "../../hoc/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../AxiosOrders";
import Spinner from "../../components/UI/Spinner/Spinner";
import WithErrorHandler from "../../hoc/WithErrorHandler/WithErrorHandler";
import { withRouter } from "react-router-dom"; // ✅ Use built-in v5 withRouter
import { connect } from "react-redux";
import * as actions from "../../Store/Actions";

const Burgerbuilder = (props) => {
  const [purchasing, setPurchasing] = useState(false);
  const { onInitIngredients } = props;
  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

  const updatePurchaseState = (ingredients) => {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
    return sum > 0;
  };

  const purchaseHandler = () => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.onSetAuthRedirectPath("/checkout");
      props.history.push("/auth");
    }
  };
  const purchaseCancelHandler = () => setPurchasing(false);

  const purchaseContinueHandler = () => {
    props.onInitPurchase();
    props.history.push("/checkout");
  };

  let disabledInfo = {};
  if (props.ings) {
    disabledInfo = { ...props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
  }

  let orderSummary = null;
  let burger = props.error ? (
    <p>The ingredients cannot be loaded!</p>
  ) : (
    <Spinner />
  );

  if (props.ings) {
    burger = (
      <Auxi>
        <Burger ingredients={props.ings} />
        <BuildControls
          ingredientAdded={props.onIngredientAdded}
          ingredientRemoved={props.onIngredientRemoved}
          purchasable={updatePurchaseState(props.ings)}
          price={props.price}
          disabled={disabledInfo}
          isAuth={props.isAuthenticated}
          ordered={purchaseHandler}
        />
      </Auxi>
    );

    orderSummary = (
      <OrderSummary
        ingredients={props.ings}
        purchaseCancelled={purchaseCancelHandler}
        purchaseContinued={purchaseContinueHandler}
        price={props.price}
      />
    );
  }

  //if (this.state.loading) orderSummary = <Spinner />;

  return (
    <Auxi>
      <Modal show={purchasing} modalClosed={purchaseCancelHandler}>
        {orderSummary}
      </Modal>
      {burger}
    </Auxi>
  );
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdded: (ingName) => {
      dispatch(actions.addIngredient(ingName));
    },
    onIngredientRemoved: (ingName) => {
      dispatch(actions.removeIngredient(ingName));
    },
    onInitIngredients: () => {
      dispatch(actions.initIngredients());
    },

    onInitPurchase: () => dispatch(actions.purchaseInit()),

    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithErrorHandler(withRouter(Burgerbuilder), axios));
