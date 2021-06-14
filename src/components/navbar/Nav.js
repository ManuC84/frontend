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
  Snackbar,
  Fade,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import MenuIcon from "@material-ui/icons/Menu";
import CloseIcon from "@material-ui/icons/Close";
import InfoIcon from "@material-ui/icons/Info";
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
import Search from "../searchbar/Search";
import io from "socket.io-client";
import environment from "../../environment";
import NotificationPanel from "../notificationPanel/NotificationPanel";
import OutsideClickHandler from "react-outside-click-handler";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

let socket;

const Nav = ({ appProps }) => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const [drawer, setDrawer] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const ENDPOINT = environment.baseUrl;

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    socket.on("user", (res) => {
      const response = JSON.parse(res);

      if (response._id === user.data.result._id) {
        // Get the existing data
        var existing = localStorage.getItem("profile");

        // If no existing data, create an array
        // Otherwise, convert the localStorage string to an array
        existing = existing ? JSON.parse(existing) : {};

        // Add new data to localStorage Array
        existing.data.result["notifications"] = response.notifications;

        // Save back to localStorage
        localStorage.setItem("profile", JSON.stringify(existing));
        setUser(JSON.parse(localStorage.getItem("profile")));
        setSnackbarOpen(true);
      }
    });
    return () => {
      socket.disconnect();
    };
  }, [user]);

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

  //Close notification info snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  return (
    <HideOnScroll {...appProps}>
      <AppBar elevation={0} className={classes.root}>
        <nav className={classes.nav}>
          <Link
            to="/"
            className={classes.link}
            onClick={() => dispatch(fetchPosts())}
          >
            <img src={logo} alt="logo" className={classes.logo} />
          </Link>

          {!user ? (
            <div>
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
                  <Badge
                    badgeContent={user?.data?.result?.notifications?.length}
                    color="secondary"
                  >
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
                onClick={() => setOpenNotifications(!openNotifications)}
              >
                <Typography variant="h6" style={{ fontSize: 16 }}>
                  {user?.data?.result?.name}
                </Typography>
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
              <ListItem component={Link} to="/about" button>
                <ListItemIcon>
                  <InfoIcon />
                </ListItemIcon>
                <ListItemText>About</ListItemText>
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
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error">
            You have a new notification
          </Alert>
        </Snackbar>

        {user && openNotifications ? (
          <OutsideClickHandler
            onOutsideClick={() =>
              setTimeout(() => {
                setOpenNotifications(false);
              }, 10)
            }
          >
            <NotificationPanel
              user={user}
              setUser={setUser}
              openNotifications={openNotifications}
              setOpenNotifications={setOpenNotifications}
            />
          </OutsideClickHandler>
        ) : null}
      </AppBar>
    </HideOnScroll>
  );
};

export default Nav;
