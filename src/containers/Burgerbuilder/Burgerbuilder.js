import React, { Component } from "react";
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

class Burgerbuilder extends Component {
  state = {
    purchasing: false,
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.values(ingredients).reduce((sum, el) => sum + el, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };
  purchaseCancelHandler = () => this.setState({ purchasing: false });

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    let disabledInfo = {};
    if (this.props.ings) {
      disabledInfo = { ...this.props.ings };
      for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
    }

    let orderSummary = null;
    let burger = this.props.error ? (
      <p>The ingredients cannot be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Auxi>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientAdded}
            ingredientRemoved={this.props.onIngredientRemoved}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            disabled={disabledInfo}
            isAuth={this.props.isAuthenticated}
            ordered={this.purchaseHandler}
          />
        </Auxi>
      );

      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price}
        />
      );
    }

    if (this.state.loading) orderSummary = <Spinner />;

    return (
      <Auxi>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxi>
    );
  }
}

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
