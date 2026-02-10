import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import Layout from "./components/Layout/layout";
import Burgerbuilder from "./containers/Burgerbuilder/Burgerbuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom"; // ✅ v5 uses Switch
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/logout/Logout";
import * as actions from "./Store/Actions/index";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom"; // ✅ Use built-in v5 withRouter
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" component={Burgerbuilder} />
        <Redirect to="/" />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/Orders" component={Orders} />
          <Route path="/logout" component={Logout} />
          <Route path="/auth" component={Auth} />
          <Route path="/" exact component={Burgerbuilder} />
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
