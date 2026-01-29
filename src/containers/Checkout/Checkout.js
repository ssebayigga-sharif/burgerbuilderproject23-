import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, withRouter, Redirect } from "react-router-dom"; // ✅ v5 imports
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
//import * as actions from "../../Store/Actions/index";

class Checkout extends Component {
  checkoutCancelledHandler = () => {
    this.props.history.goBack(); // ✅ v5 navigation
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace(this.props.match.path + "/contact-data"); // ✅ v5 nested route
  };

  render() {
    let summary = <Redirect to="/" />;

    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredient={this.props.ings}
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContinued={this.checkoutContinuedHandler}
          />
          ,
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </div>
      );
    }
    return summary;
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(withRouter(Checkout));
