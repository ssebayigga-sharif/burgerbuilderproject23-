import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, withRouter, Redirect } from "react-router-dom"; // ✅ v5 imports
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";
//import * as actions from "../../Store/Actions/index";

const Checkout = (props) => {
  const checkoutCancelledHandler = () => {
    props.history.goBack(); // ✅ v5 navigation
  };

  const checkoutContinuedHandler = () => {
    props.history.replace(props.match.path + "/contact-data"); // ✅ v5 nested route
  };

  let summary = <Redirect to="/" />;

  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;
    summary = (
      <div>
        {purchasedRedirect}
        <CheckoutSummary
          ingredient={props.ings}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        ,
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }
  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(withRouter(Checkout));
