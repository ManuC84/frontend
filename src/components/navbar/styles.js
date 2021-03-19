import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export default makeStyles((theme) => ({
  root: {
    backgroundColor: "#6B95BC",
  },
  nav: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "5px 15px",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      padding: "10px 0",
    },
  },
  link: {
    height: "45px",
  },
  logo: {
    height: "100%",
  },
  logInButton: {
    color: theme.palette.getContrastText(red[500]),
    backgroundColor: red[500],
    "&:hover": {
      backgroundColor: red[700],
    },
    [theme.breakpoints.down("xs")]: {
      width: "50%",
    },
  },
  userInfoContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    width: "20%",
    margin: "0px",
    padding: "0px",
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
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
}));
