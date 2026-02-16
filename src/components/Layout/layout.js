import Auxi from "../../hoc/Auxi";
import React, { Component, useState } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

const Layout = (props) => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const SideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };
  const sideDrawerToggleHandler = () => {
    setSideDrawerIsVisible(!sideDrawerIsVisible);
  };

  return (
    <Auxi>
      {" "}
      <Toolbar
        isAuth={props.isAuthenticated}
        drawerToggleClicked={sideDrawerToggleHandler}
      />
      <SideDrawer
        isAuth={props.isAuthenticated}
        open={sideDrawerIsVisible}
        closed={SideDrawerClosedHandler}
      />
      <main className={classes.content}>{props.children}</main>
    </Auxi>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};
export default connect(mapStateToProps)(Layout);
