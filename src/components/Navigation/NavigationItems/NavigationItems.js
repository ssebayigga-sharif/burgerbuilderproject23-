import React from "react";

import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const NavigationItems = (props) => {
  return (
    <div>
      <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>
          Burger Builder
        </NavigationItem>
        <NavigationItem link="/Orders">Orders</NavigationItem>
        {!props.isAuthenticated ? (
          <NavigationItem link="/auth">Authenticate</NavigationItem>
        ) : (
          <NavigationItem link="/logout">Logout</NavigationItem>
        )}
      </ul>
    </div>
  );
};

export default NavigationItems;
