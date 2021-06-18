import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  notificationDropdown: {
    width: 300,
    height: 500,
    position: "absolute",
    right: 5,
    top: 60,
    overflowY: "scroll",
  },
  notificationMenu: {
    visibility: "visible !important",
    height: 500,
    overflowY: "scroll",
    opacity: "1 !important",
  },
  listItemsBg: {
    backgroundColor: "lightCyan",
    "&:hover": {
      backgroundColor: "cyan",
    },
  },
}));
