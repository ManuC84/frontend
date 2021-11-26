import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    marginTop: 20,
    [theme.breakpoints.down("xs")]: {
      marginTop: "20px",
    },
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    width: "50%",
    [theme.breakpoints.down("xl")]: {
      width: "60%",
    },
    [theme.breakpoints.down("lg")]: {
      width: "50%",
    },
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
  },
  sortContainer: {
    display: "flex",
    alignItems: "center",
    width: "50%",
    padding: 10,
    [theme.breakpoints.down("md")]: {
      width: "50%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "70%",
    },
    [theme.breakpoints.down("xs")]: {
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
  searchButton: {
    [theme.breakpoints.down("xs")]: {
      marginTop: "10px",
    },
  },
}));
