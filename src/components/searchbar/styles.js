import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  navSpacer: {
    marginTop: "80px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "120px",
    },
  },
  paper: {
    display: "flex",
    flexDirection: "column",
  },
  searchBarContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "20px 20px 0 20px",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  tagsContainer: {
    display: "flex",
    alignItems: "center",
    margin: "5px 0",
    flexWrap: "wrap",
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
  tagButton: {
    marginRight: "5px",
    [theme.breakpoints.down("xs")]: {
      marginTop: "5px",
    },
  },
  hiddenInput: {
    display: "none",
  },
}));
