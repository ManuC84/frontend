import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
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
  showReplies: {
    height: "20px",
    marginRight: "5px",
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
  },
  replyNumber: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
    },
  },
}));
