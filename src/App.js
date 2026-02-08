import logo from "./logo.svg";
import "./App.css";
import { Component } from "react";
import Layout from "./components/Layout/layout";
import Burgerbuilder from "./containers/Burgerbuilder/Burgerbuilder";
import Checkout from "./containers/Checkout/Checkout";
import { Route, Switch } from "react-router-dom"; //  v5 uses Switch
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/Orders" component={Orders} />
            <Route path="/auth" component={Auth} />
            <Route path="/" exact component={Burgerbuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
