import React, { useState, useEffect } from "react";
import { AppBar, Button } from "@material-ui/core";
import logo from "../../img/logo.png";
import makeStyles from "./styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../actions/posts";
import { logout } from "../../reducers/slice/authSlice";
import decode from "jwt-decode";

const Nav = () => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = user?.token;
    //TOKEN EXPIRY
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        signout();
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const signout = () => {
    dispatch(logout());
    history.push("/");
    setUser(null);
  };

  return (
    <AppBar className={classes.root}>
      <nav className={classes.nav}>
        <Link
          to="/"
          className={classes.link}
          onClick={() => dispatch(fetchPosts())}
        >
          <img src={logo} alt="logo" className={classes.logo} />
        </Link>
        {!user ? (
          <Button
            component={Link}
            to="/auth"
            className={classes.logInButton}
            size="medium"
            variant="contained"
            startIcon={<AccountCircleIcon />}
          >
            Log In
          </Button>
        ) : (
          <Button
            component={Link}
            to="/"
            className={classes.logInButton}
            variant="contained"
            startIcon={<AccountCircleIcon />}
            onClick={signout}
          >
            Log Out
          </Button>
        )}
      </nav>
    </AppBar>
  );
};

export default Nav;
