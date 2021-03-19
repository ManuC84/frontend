import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    width: "100%",
    [theme.breakpoints.down("xs")]: {
      marginTop: "80px",
    },
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    width: "70%",
    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
  },
  searchBarContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 10px",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
  tagsContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    paddingBottom: "10px",
    paddingLeft: "10px",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },

  searchBar: {
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
}));
