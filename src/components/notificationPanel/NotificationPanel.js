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

const NotificationPanel = ({
  user,
  openNotifications,
  setOpenNotifications,
}) => {
  const classes = makeStyles();
  const dispatch = useDispatch();

  return (
    <Fade in={openNotifications} timeout={500}>
      <Paper elevation={3} className={classes.notificationDropdown}>
        {user?.data?.result?.notifications?.map((notification) => (
          <List style={{ padding: 0 }}>
            <Link
              href={`posts/${notification.parentPostId}`}
              style={{ textDecoration: "none", color: "inherit" }}
              title="Go to post"
            >
              <ListItem
                style={{ display: "flex", flexDirection: "column" }}
                button
                divider
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
            </Link>
          </List>
        ))}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button color="primary" style={{ width: "100%" }}>
            Clear all
          </Button>
        </div>
      </Paper>
    </Fade>
  );
};

export default NotificationPanel;
