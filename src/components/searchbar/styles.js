import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  navSpacer: {
    marginTop: "100px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "140px",
    },
  },
  paper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  search: {
    width: "50%",
    [theme.breakpoints.down("xs")]: {
      width: "90%",
    },
  },
}));
