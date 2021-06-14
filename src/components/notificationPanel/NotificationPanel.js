import React from "react";
import { Paper } from "@material-ui/core";
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
} from "@material-ui/core";
import ReadMore from "../../utils/readMore/ReadMore";
import moment from "moment";
import {} from "../../reducers/slice/postsSlice";
import { useDispatch } from "react-redux";
import { useGlobalContext } from "../../context";

import { getNotificationContent } from "../../actions/posts";

const NotificationPanel = ({
  user,
  openNotifications,
  setOpenNotifications,
}) => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  // const { setExpanded } = useGlobalContext();

  const fetchNotification = (postId, commentId, commentReplyId) => {
    dispatch(getNotificationContent(postId, commentId, commentReplyId));
  };

  return (
    <Fade in={openNotifications} timeout={500}>
      <Paper elevation={3} className={classes.notificationDropdown}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 5,
          }}
        >
          <Button color="primary" style={{ width: "100%" }}>
            Clear all
          </Button>
          <Button color="primary" style={{ width: "100%" }}>
            Read all
          </Button>
        </div>
        {user?.data?.result?.notifications?.map((notification, idx) => (
          <List key={idx} style={{ padding: 0 }}>
            <ListItem
              style={{ display: "flex", flexDirection: "column" }}
              button
              divider
              onClick={() =>
                fetchNotification(
                  notification.parentPostId,
                  notification.parentCommentId,
                  notification.commentReplyId
                )
              }
            >
              <Typography variant="caption">
                {moment(notification.createdAt).fromNow() + " "}
              </Typography>
              <h5 style={{ margin: 0 }}>{notification.name} replied:</h5>

              <div style={{ margin: "5px 0" }}>
                <ReadMore
                  variant={"body2"}
                  lines={50}
                  content={notification.commentReply}
                />
              </div>
            </ListItem>
          </List>
        ))}
      </Paper>
    </Fade>
  );
};

export default NotificationPanel;
