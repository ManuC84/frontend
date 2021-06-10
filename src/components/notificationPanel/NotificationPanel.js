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
} from "@material-ui/core";
import ReadMore from "../../utils/readMore/ReadMore";

const NotificationPanel = ({
  user,
  openNotifications,
  setOpenNotifications,
}) => {
  const classes = makeStyles();
  return (
    <Fade in={openNotifications} timeout={500}>
      <Paper elevation={3} className={classes.notificationDropdown}>
        {user?.data?.result?.notifications?.map((notification) => (
          <List style={{ padding: 0 }}>
            <ListItem
              style={{ display: "flex", flexDirection: "column" }}
              button
              divider
            >
              <h5 style={{ margin: 0 }}>{notification.name} replied:</h5>

              <div style={{ margin: "5px 0" }}>
                <ReadMore lines={50} content={notification.commentReply} />
              </div>
            </ListItem>
          </List>
        ))}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button>Clear all</Button>
        </div>
      </Paper>
    </Fade>
  );
};

export default NotificationPanel;
