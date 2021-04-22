import React, { useState, useEffect } from "react";
import {
  AppBar,
  Button,
  Container,
  Avatar,
  Typography,
  Chip,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import HomeIcon from "@material-ui/icons/Home";
import clsx from "clsx";
import logo from "../../img/logo-final.png";
import makeStyles from "./styles";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchPosts } from "../../actions/posts";
import { logout } from "../../reducers/slice/authSlice";
import decode from "jwt-decode";
import HideOnScroll from "../../utils/HideNav";

const Nav = ({ appProps }) => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [drawer, setDrawer] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const token = user?.data?.token;
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
    history.push("/auth");
    setUser(null);
  };

  const handleDrawerOpen = () => {
    setDrawer(true);
  };
  return (
    <HideOnScroll {...appProps}>
      <AppBar color="transparent" elevation={0} className={classes.root}>
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
                color="secondary"
                component={Link}
                to="/auth"
                className={classes.logInButton}
                style={{ marginRight: 10 }}
                variant="contained"
                startIcon={<AccountCircleIcon />}
              >
                Log In
              </Button>
              <IconButton
                style={{ color: "white", padding: "0 12px" }}
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
              >
                <MenuIcon className={classes.menuIcon} />
              </IconButton>
            </div>
          ) : (
            <div>
              <Button
                className={classes.logInButton}
                variant="contained"
                endIcon={
                  <Badge badgeContent={1} color="secondary">
                    <Avatar
                      alt="User"
                      className={classes.mediumAvatar}
                      src={user?.data?.result?.imageUrl}
                    />
                  </Badge>
                }
                color="primary"
                size="medium"
                style={{ marginRight: 10, textTransform: "none" }}
              >
                {user?.data?.result?.name}
              </Button>
              <IconButton
                style={{ color: "white", padding: "0 12px" }}
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerOpen}
              >
                <MenuIcon className={classes.menuIcon} />
              </IconButton>
            </div>
          )}
        </nav>
        <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
          <div className={classes.list}>
            <List onClick={() => setDrawer(false)}>
              <Button style={{ marginBottom: "1rem" }}>
                <CloseIcon />
              </Button>
              <ListItem component={Link} to="/" button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText>Home</ListItemText>
              </ListItem>

              {!user ? (
                <ListItem component={Link} to="/auth" button>
                  <ListItemIcon>
                    <LockIcon />
                  </ListItemIcon>
                  <ListItemText>Log In</ListItemText>
                </ListItem>
              ) : (
                <ListItem component={Link} to="/auth" button onClick={signout}>
                  <ListItemIcon>
                    <LockOpenIcon />
                  </ListItemIcon>
                  <ListItemText>Log Out</ListItemText>
                </ListItem>
              )}
            </List>
          </div>
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
};

export default Nav;
