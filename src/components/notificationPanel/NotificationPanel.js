import React from "react";
import makeStyles from "./styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Fade,
  Button,
  Typography,
  Link,
  Avatar,
  Paper,
} from "@material-ui/core";
import InboxIcon from "@material-ui/icons/Inbox";
import ReadMore from "../../utils/readMore/ReadMore";
import moment from "moment";
import {} from "../../reducers/slice/postsSlice";
import { useDispatch } from "react-redux";
import { useGlobalContext } from "../../context";

import { getNotificationContent, clearAll } from "../../actions/notifications";

const NotificationPanel = ({
  user,
  setUser,
  openNotifications,
  setOpenNotifications,
  type,
  setDrawer,
}) => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  // const { setExpanded } = useGlobalContext();

  const fetchNotification = (postId, commentId, commentReplyId, userId) => {
    dispatch(getNotificationContent(postId, commentId, commentReplyId, userId));
    var existing = localStorage.getItem("profile");

    existing = existing ? JSON.parse(existing) : {};
    let notifications = existing.data.result["notifications"];
    let updatedNotifications = notifications.map((notification) =>
      notification.commentReplyId === commentReplyId
        ? (notification.read = true)
        : notification
    );
    notifications = updatedNotifications;

    localStorage.setItem("profile", JSON.stringify(existing));
    setUser(existing);
    if (setDrawer) setDrawer(false);
    if (setOpenNotifications) setOpenNotifications(false);
  };

  const clearAllNotifications = (type) => {
    if (type == "clear") {
      dispatch(clearAll(user?.data?.result?._id, { type: type }));
      var existing = localStorage.getItem("profile");

      existing = existing ? JSON.parse(existing) : {};
      existing.data.result["notifications"] = [];

      localStorage.setItem("profile", JSON.stringify(existing));
      setUser(existing);
    }
    if (type == "read") {
      dispatch(clearAll(user?.data?.result?._id, { type: type }));
      var existing = localStorage.getItem("profile");

      existing = existing ? JSON.parse(existing) : {};
      let notifications = existing.data.result["notifications"];
      let updatedNotifications = notifications.map(
        (notification) => (notification.read = true)
      );
      notifications = updatedNotifications;

      localStorage.setItem("profile", JSON.stringify(existing));
      setUser(existing);
    }
  };

  return (
    <Fade in={openNotifications} timeout={500}>
      <Paper
        elevation={3}
        className={
          type === "menu"
            ? classes.notificationMenu
            : classes.notificationDropdown
        }
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <Button
            color="primary"
            style={{ width: "100%" }}
            onClick={() => clearAllNotifications("clear")}
          >
            Clear all
          </Button>
          <Button
            color="primary"
            style={{ width: "100%" }}
            onClick={() => clearAllNotifications("read")}
          >
            Read all
          </Button>
        </div>
        {user?.data?.result?.notifications?.length === 0 ||
        user?.data?.result?.notifications?.length === undefined ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50%",
            }}
          >
            <h5>There's no new notifications</h5>
          </div>
        ) : (
          user?.data?.result?.notifications?.map((notification, idx) => (
            <List key={idx} style={{ padding: 0 }}>
              <ListItem
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
                className={!notification.read && classes.listItemsBg}
                button
                divider
                onClick={() =>
                  fetchNotification(
                    notification.parentPostId,
                    notification.parentCommentId,
                    notification.commentReplyId,
                    user?.data?.result?._id
                  )
                }
              >
                <ListItemIcon>
                  <Avatar />
                </ListItemIcon>
                <Typography variant="caption">
                  {moment(notification.createdAt).fromNow() + " "}
                </Typography>
                <h5 style={{ margin: 0 }}>{notification.name} replied:</h5>

                <div
                  style={{
                    margin: "5px 0",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <ReadMore
                    variant={"body2"}
                    lines={150}
                    content={notification.commentReply}
                  />
                </div>
              </ListItem>
            </List>
          ))
        )}
      </Paper>
    </Fade>
  );
};

export default NotificationPanel;
