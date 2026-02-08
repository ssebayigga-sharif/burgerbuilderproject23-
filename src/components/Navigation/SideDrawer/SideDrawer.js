import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Auxi from "../../../hoc/Auxi";
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.open];
  }
  return (
    <Auxi>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join("  ")}>
        <div className={classes.logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </Auxi>
  );
};

export default SideDrawer;
