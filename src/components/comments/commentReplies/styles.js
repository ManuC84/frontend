import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  commentReply: {
    marginLeft: 80,
    [theme.breakpoints.down("xs")]: {
      marginLeft: 25,
    },
  },
}));
