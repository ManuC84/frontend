import React from "react";
import { AppBar } from "@material-ui/core";
import logo from "../../img/logo.png";
import makeStyles from "./styles";

const Nav = () => {
  const classes = makeStyles();
  return (
    <AppBar className={classes.root}>
      <nav className={classes.nav}>
        <img src={logo} alt="logo" className={classes.logo} />
      </nav>
    </AppBar>
  );
};

export default Nav;
