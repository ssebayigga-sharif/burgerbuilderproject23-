import logo from "./logo.svg";
import "./App.css";
import React, { Component, Suspense, useEffect } from "react";
import Layout from "./components/Layout/layout";
import Burgerbuilder from "./containers/Burgerbuilder/Burgerbuilder";
import { Route, Switch, Redirect } from "react-router-dom"; // ✅ v5 uses Switch
import Logout from "./containers/Auth/logout/Logout";
import * as actions from "./Store/Actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"; // ✅ Use built-in v5 withRoute

const Checkout = React.lazy(() => {
  return import("./containers/Checkout/Checkout");
});
const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});
const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const App = (props) => {
  const { onTryAutoSignup } = props;
  useEffect(() => {
    onTryAutoSignup();
  }, [onTryAutoSignup]);

  let routes = (
    <Switch>
      <Route path="/auth" render={(props) => <Auth {...props} />} />
      <Route path="/" component={Burgerbuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/checkout" render={(props) => <Checkout {...props} />} />
        <Route path="/orders" render={(props) => <Orders {...props} />} />
        <Route path="/logout" component={Logout} />
        <Route path="/auth" render={(props) => <Auth {...props} />} />
        <Route path="/" exact component={Burgerbuilder} />
        <Redirect to="/" />
      </Switch>
    );
  }
  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading....</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => {
      dispatch(actions.authCheckState());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
