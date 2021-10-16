import React, { useState, useEffect, useReducer } from 'react';
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
  Divider,
  ListSubheader,
  Slide,
  useTheme,
  useMediaQuery,
} from '@material-ui/core';
import { Link as MuiLink } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import MenuIcon from '@material-ui/icons/Menu';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import CloseIcon from '@material-ui/icons/Close';
import KeyboardBackspaceIcon from '@material-ui/icons/KeyboardBackspace';
import InfoIcon from '@material-ui/icons/Info';
import HomeIcon from '@material-ui/icons/Home';
import BookIcon from '@material-ui/icons/Book';
import clsx from 'clsx';
import logo from '../../img/logo-final.png';
import logo2 from '../../img/freely_comment_logo.png';
import makeStyles from './styles';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../../reducers/slice/postsSlice';
import { addNewNotification } from '../../reducers/slice/notificationsSlice';
import { logout } from '../../reducers/slice/authSlice';
import decode from 'jwt-decode';
import HideOnScroll from '../../utils/HideNav';
import Search from '../searchbar/Search';
import io from 'socket.io-client';
import environment from '../../environment';
import NotificationPanel from '../notificationPanel/NotificationPanel';
import OutsideClickHandler from 'react-outside-click-handler';
import { Copyright } from '../../pages/auth/Auth';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import { useSelector } from 'react-redux';
import { useGlobalContext } from '../../context';
import EditIcon from '@material-ui/icons/Edit';
import Upload from '../../utils/Upload';
import { FiChrome } from 'react-icons/fi';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const NavButtons = ({ location }) => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  return (
    <div className={classes.navButtons}>
      <Link
        to="/"
        style={{ textDecoration: 'none' }}
        onClick={() => dispatch(fetchPosts())}
      >
        <Button
          className={classes.navButton}
          style={{
            textDecoration: location.pathname === '/' && 'underline',
          }}
        >
          Home
        </Button>
      </Link>
      <Link to="#" style={{ textDecoration: 'none' }}>
        <Button
          className={classes.navButton}
          style={{
            textDecoration: location.pathname === '/about' && 'underline',
          }}
        >
          About
        </Button>
      </Link>
      <Link to="#" style={{ textDecoration: 'none' }}>
        <Button className={classes.navButton} style={{}}>
          Contact
        </Button>
      </Link>
      <Link to="#" style={{ textDecoration: 'none' }}>
        <Button className={classes.navButton} style={{}}>
          Blog
        </Button>
      </Link>
    </div>
  );
};

let socket;

const Nav = ({ appProps }) => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
  const [drawer, setDrawer] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [notificationMenu, setNotificationMenu] = useState(false);
  const { notifications } = useSelector((state) => state.notifications);
  const history = useHistory();
  const location = useLocation();
  const ENDPOINT = environment.baseUrl;
  const { setSnackbarOpen } = useGlobalContext();
  const theme = useTheme();
  const showBadge = useMediaQuery(theme.breakpoints.down('xs'));

  //upload profile photo modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  function capitalizeFirstLetter(string) {
    var words = string.split(' ');
    var CapitalizedWords = [];
    words.forEach((element) => {
      CapitalizedWords.push(
        element[0].toUpperCase() + element.slice(1, element.length),
      );
    });
    return CapitalizedWords.join(' ');
  }

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ['websocket', 'polling', 'flashsocket'],
    });

    socket.on('user', (res) => {
      if (
        res.parentUserId === (user.data.result._id || user.data.result.googleId)
      ) {
        dispatch(addNewNotification(res));
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
    setUser(JSON.parse(localStorage.getItem('profile')));
  }, [location]);

  const signout = () => {
    dispatch(logout());
    history.push('/auth');
    setUser(null);
  };

  const handleDrawerOpen = () => {
    setDrawer(true);
  };

  return (
    <HideOnScroll {...appProps}>
      <AppBar elevation={3} className={classes.root}>
        <nav className={classes.nav}>
          <Link
            to="/"
            className={classes.link}
            onClick={() => dispatch(fetchPosts())}
          >
            <img src={logo} alt="logo" className={classes.logo} />
          </Link>

          {/* <NavButtons location={location} /> */}

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
                style={{ color: 'white', padding: '0 12px' }}
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
                    badgeContent={
                      notifications.filter(
                        (notification) => notification.read === false,
                      ).length
                    }
                    color="secondary"
                    showZero
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
                style={{ marginRight: 10, textTransform: 'none' }}
                onClick={() => setOpenNotifications(!openNotifications)}
              >
                <Typography variant="h6" style={{ fontSize: 16 }}>
                  {capitalizeFirstLetter(user?.data?.result?.name)}
                </Typography>
              </Button>
              {showBadge ? (
                <Badge
                  badgeContent={
                    notifications.filter(
                      (notification) => notification.read === false,
                    ).length
                  }
                  color="secondary"
                  overlap="circle"
                  alt="badge"
                  showZero
                >
                  <IconButton
                    style={{ color: 'white', padding: '0 12px' }}
                    aria-label="open drawer"
                    edge="end"
                    onClick={handleDrawerOpen}
                  >
                    <MenuIcon className={classes.menuIcon} />
                  </IconButton>
                </Badge>
              ) : (
                <IconButton
                  style={{ color: 'white', padding: '0 12px' }}
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerOpen}
                >
                  <MenuIcon className={classes.menuIcon} />
                </IconButton>
              )}
            </div>
          )}
        </nav>
        <Drawer
          anchor="right"
          open={drawer}
          onClose={() => {
            setDrawer(false);
            setNotificationMenu(false);
          }}
        >
          <List className={classes.list}>
            <Button
              style={{ marginBottom: '1rem' }}
              onClick={() => {
                setDrawer(false);
                setNotificationMenu(false);
              }}
            >
              <CloseIcon />
            </Button>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
              }}
            >
              <div>
                <ListItem
                  component={Link}
                  to="/"
                  button
                  onClick={() => {
                    setDrawer(false);
                    setNotificationMenu(false);
                  }}
                >
                  <ListItemIcon>
                    <HomeIcon />
                  </ListItemIcon>
                  <ListItemText>Home</ListItemText>
                </ListItem>
                <ListItem
                  // component={Link}
                  // to="/about"
                  button
                  disabled
                  // onClick={() => {
                  //   setDrawer(false);
                  //   setNotificationMenu(false);
                  // }}
                >
                  <ListItemIcon>
                    <InfoIcon />
                  </ListItemIcon>
                  <ListItemText>About</ListItemText>
                </ListItem>
                <ListItem button disabled>
                  <ListItemIcon>
                    <ContactMailIcon />
                  </ListItemIcon>
                  <ListItemText>Contact</ListItemText>
                </ListItem>
                <ListItem button disabled>
                  <ListItemIcon>
                    <BookIcon />
                  </ListItemIcon>
                  <ListItemText>Blog</ListItemText>
                </ListItem>
                <Divider style={{ marginTop: 10 }} />
                <ListItem
                  button
                  className={classes.chromeButton}
                  component={MuiLink}
                  href="https://chrome.google.com/webstore/detail/freely-comment/lgbgfbpimhcpkcnghfpjejclkokonbae"
                  target="_blank"
                  underline="none"
                >
                  <ListItemIcon>
                    <FiChrome fontSize="20px" color="white" />
                  </ListItemIcon>
                  <ListItemText>Get Chrome extension</ListItemText>
                </ListItem>
              </div>

              <div>
                {!user ? (
                  <ListItem
                    component={Link}
                    to="/auth"
                    button
                    onClick={() => setDrawer(false)}
                  >
                    <ListItemText
                      style={{ display: 'flex', justifyContent: 'center' }}
                    >
                      Log in
                    </ListItemText>
                  </ListItem>
                ) : notificationMenu ? (
                  <Slide direction="right" in={notificationMenu}>
                    <div>
                      <Button>
                        <KeyboardBackspaceIcon
                          onClick={() => setNotificationMenu(false)}
                        />
                      </Button>
                      <NotificationPanel
                        user={user}
                        setUser={setUser}
                        openNotifications={openNotifications}
                        setOpenNotifications={setOpenNotifications}
                        type={'menu'}
                        setDrawer={setDrawer}
                      />
                    </div>
                  </Slide>
                ) : (
                  <>
                    <ListItem
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        marginBottom: 20,
                      }}
                    >
                      <ListSubheader>You're logged in as:</ListSubheader>
                      <ListSubheader
                        style={{
                          marginBottom: 5,
                          wordWrap: 'break-word',
                          fontWeight: 'bolder',
                        }}
                        color="primary"
                      >
                        {capitalizeFirstLetter(user?.data?.result?.name)}
                      </ListSubheader>
                      <Badge
                        badgeContent={
                          notifications.filter(
                            (notification) => notification.read === false,
                          ).length
                        }
                        color="secondary"
                        overlap="circle"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setNotificationMenu(true)}
                        alt="badge"
                        title="Click for notifications"
                        showZero
                      >
                        <Avatar
                          alt="User"
                          className={classes.largeAvatar}
                          src={user?.data?.result?.imageUrl}
                        />
                      </Badge>
                      {user.data.result._id && (
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            marginTop: 5,
                          }}
                        >
                          <EditIcon
                            onClick={handleOpenModal}
                            style={{ cursor: 'pointer' }}
                          />{' '}
                          <ListSubheader>Edit your profile photo</ListSubheader>
                        </div>
                      )}
                    </ListItem>
                    <ListItem
                      component={Link}
                      to="/auth"
                      button
                      onClick={() => {
                        signout();
                        setDrawer(false);
                      }}
                    >
                      <ListItemText
                        style={{ display: 'flex', justifyContent: 'center' }}
                      >
                        Log Out
                      </ListItemText>
                    </ListItem>
                  </>
                )}
              </div>
              <div>
                <Divider />
                <ListItem
                  style={{
                    marginTop: 50,
                    marginBottom: 10,
                    display: 'flex',
                    justifyContent: 'center',
                  }}
                >
                  <img src={logo2} alt="logo" style={{ height: 50 }} />
                </ListItem>
                <Copyright textColor={'black'} />
              </div>
            </div>
          </List>
        </Drawer>

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
              setDrawer={setDrawer}
            />
          </OutsideClickHandler>
        ) : null}
        <Upload
          openModal={openModal}
          handleCloseModal={handleCloseModal}
          user={user}
          setOpenModal={setOpenModal}
        />
      </AppBar>
    </HideOnScroll>
  );
};

export default Nav;
