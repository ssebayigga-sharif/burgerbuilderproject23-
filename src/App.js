import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import Layout from "./components/Layout/layout";
import Burgerbuilder from "./containers/Burgerbuilder/Burgerbuilder";
import { Route, Switch, Redirect } from "react-router-dom"; // ✅ v5 uses Switch
import Logout from "./containers/Auth/logout/Logout";
import * as actions from "./Store/Actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"; // ✅ Use built-in v5 withRoute
import Asynccomponent from "./hoc/asynccomponent/asynccomponent";

const asyncCheckout = Asynccomponent(() => {
  return import("./containers/Checkout/Checkout");
});
const asyncOrders = Asynccomponent(() => {
  return import("./containers/Orders/Orders");
});
const asyncAuth = Asynccomponent(() => {
  return import("./containers/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" component={Burgerbuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={asyncAuth} />
          <Route path="/" exact component={Burgerbuilder} />
          <Redirect to="/" />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}
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
