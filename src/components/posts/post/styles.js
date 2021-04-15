import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

export const useStyles = makeStyles((theme) => ({
  card: {
    [theme.breakpoints.down("xl")]: {
      width: 700,
    },
    [theme.breakpoints.down("lg")]: {
      width: 600,
    },
    [theme.breakpoints.down("md")]: {
      maxWidth: 500,
    },
    [theme.breakpoints.down("sm")]: {
      maxWidth: 500,
    },
    [theme.breakpoints.down("xs")]: {
      width: "100%",
    },
    margin: "10px 0",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
    backgroundSize: "contain",
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
  addTagContainer: {
    padding: "0 16px",
  },

  addTagButton: {
    marginTop: "15px",
  },
  addTagInput: {
    marginRight: "10px",
    minWidth: "10%",
  },
  cardActionsSocial: {
    display: "flex",
    justifyContent: "space-between",
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
    },
  },
}));
