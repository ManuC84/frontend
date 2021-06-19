import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[800],
  },

  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "10px 20px",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "space-between",
      padding: "10px 15px",
    },
  },
  navButtons: {
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  navButton: {
    color: "white",
    "&:hover": {
      color: "#0DDDC9",
    },
  },
  link: {
    height: "45px",
  },
  logo: {
    height: "100%",
  },
  logInButton: {
    borderRadius: "50px",
    color: theme.palette.getContrastText("#7324A3"),
    backgroundImage:
      "linear-gradient(to right top, #5e44ba, #5e59c6, #626dd0, #697fd8, #7391df, #6ca1e9, #68b0f2, #69bff8, #52cffe, #41dfff, #46eefa, #5ffbf1)",
    opacity: "1",
    transition: "all 1s",
    "&:hover": {
      opacity: "0.8",
    },
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  userInfoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "0px",
    padding: "0px",
    [theme.breakpoints.down("xl")]: {
      width: "10%",
    },
    [theme.breakpoints.down("lg")]: {
      width: "20%",
    },
    [theme.breakpoints.down("md")]: {
      width: "30%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "40%",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      width: "90%",
      padding: "5px",
    },
  },
  logInButtonContainer: {
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      justifyContent: "center",
      width: "90%",
      padding: "5px",
    },
  },
  avatar: {
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  userName: {
    color: "white",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },

  list: {
    width: 250,
    height: "90vh",
  },
  menuIcon: {
    fontSize: 30,
    [theme.breakpoints.down("xs")]: {
      fontSize: 40,
    },
  },
  mediumAvatar: {
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  largeAvatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
}));
