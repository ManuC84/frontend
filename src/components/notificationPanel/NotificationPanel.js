import React, { useEffect } from "react";
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
import { fetchNotificationPost, fetchSinglePost } from "../../reducers/slice/postsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGlobalContext } from "../../context";

import { getNotificationContent } from "../../actions/notifications";
import {
  fetchSingleCommentReply,
  filterNotificationReply,
} from "../../reducers/slice/commentRepliesSlice";
import { fetchSingleComment } from "../../reducers/slice/commentsSlice";
import {
  fetchNotificationsTest,
  readAllNotifications,
  readNotification,
  clearAllNotifications,
} from "../../reducers/slice/notificationsSlice";
import { sortFunctionAsc, sortFunctionDesc } from "../../utils/Sort";

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
  const { notifications } = useSelector((state) => state.notifications);

  const fetchNotification = (postId, commentId, commentReplyId, userId, notificationId) => {
    dispatch(readNotification(notificationId));
    dispatch(fetchNotificationPost(postId));
    dispatch(fetchSingleComment({ postId, commentId }));
    dispatch(fetchSingleCommentReply({ postId, commentId, commentReplyId }));

    if (setDrawer) setDrawer(false);
    if (setOpenNotifications) setOpenNotifications(false);
  };

  return (
    <Fade in={openNotifications} timeout={500}>
      <Paper
        elevation={3}
        className={type === "menu" ? classes.notificationMenu : classes.notificationDropdown}
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
            onClick={() =>
              dispatch(clearAllNotifications(user.data.result._id || user.data.result.googleId))
            }
          >
            Clear all
          </Button>
          <Button
            color="primary"
            style={{ width: "100%" }}
            onClick={() =>
              dispatch(readAllNotifications(user.data.result._id || user.data.result.googleId))
            }
          >
            Read all
          </Button>
        </div>
        {notifications.length === 0 ? (
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
          notifications
            .map((notification, idx) => (
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
                      user?.data?.result?._id,
                      notification._id
                    )
                  }
                >
                  <ListItemIcon>
                    <Avatar src={notification.imageUrl} />
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
                    <ReadMore variant={"body2"} lines={150} content={notification.commentReply} />
                  </div>
                </ListItem>
              </List>
            ))
            .sort(sortFunctionAsc)
        )}
      </Paper>
    </Fade>
  );
};

export default NotificationPanel;
