import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Container,
  Avatar,
  Typography,
} from "@material-ui/core";
import logo from "../../img/logo.png";
import makeStyles from "./styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
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
          <div className={classes.logInButtonContainer}>
            <Button
              component={Link}
              to="/auth"
              className={classes.logInButton}
              variant="contained"
              startIcon={<AccountCircleIcon />}
            >
              Log In
            </Button>
          </div>
        ) : (
          <div className={classes.userInfoContainer}>
            <Avatar
              alt={`${user.result.givenName}${user.result.familyName}`}
              src={user.result.imageUrl}
              className={classes.avatar}
            />
            <Typography
              className={classes.userName}
            >{`${user.result.givenName} ${user.result.familyName}`}</Typography>
            <Button
              component={Link}
              to="/"
              className={classes.logInButton}
              variant="contained"
              startIcon={<LockIcon />}
              onClick={signout}
            >
              Log Out
            </Button>
          </div>
        )}
      </nav>
    </AppBar>
  );
};

export default Nav;
