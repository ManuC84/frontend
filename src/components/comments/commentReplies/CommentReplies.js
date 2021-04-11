import React from "react";
import {
  Avatar,
  Grid,
  Typography,
  IconButton,
  CardContent,
  Divider,
  Grow,
  CircularProgress,
  Menu,
  MenuItem,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import { ThumbUp, ThumbDown } from "@material-ui/icons";
import ReadMore from "../../../utils/readMore/ReadMore";
import moment from "moment";
import { useSelector } from "react-redux";

const CommentReplies = ({ post, comment, user, commentReply }) => {
  const { isLoading } = useSelector((state) => state.posts);
  const [anchorEl, setAnchorEl] = React.useState(null);

  // Comment's drop down menu related
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grow in={true}>
      <div>
        <Divider variant="middle" />
        <CardContent style={{ marginLeft: "2.5rem" }}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <Avatar
                title={commentReply.creator[0]?.data?.result?.name}
                alt="avatar"
                src={commentReply.creator[0]?.data?.result?.imageUrl}
              />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography
                variant="h6"
                style={{ margin: 0, textAlign: "left", fontSize: "0.9rem" }}
              >
                {commentReply.creator[0]?.data?.result?.name}
              </Typography>
              <Typography
                style={{
                  textAlign: "left",
                  color: "gray",
                  fontSize: "0.8rem",
                }}
              >
                {moment(commentReply.createdAt).fromNow()}
              </Typography>
              <ReadMore
                lines={200}
                content={commentReply.commentReply}
                variant={"body2"}
                color={"textPrimary"}
              />
            </Grid>
            <Grid>
              <IconButton aria-label="settings">
                <MoreVertIcon onClick={handleClick} />
              </IconButton>
            </Grid>
            {user[0]?.data?.result?.googleId ===
              commentReply?.creator[0]?.data?.result?.googleId ||
            user[0]?.data?.result?._id ===
              commentReply?.creator[0]?.data?.result?._id ? (
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                disableScrollLock={true}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
                <MenuItem onClick={handleClose}>Report</MenuItem>
              </Menu>
            ) : (
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                disableScrollLock={true}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem onClick={handleClose}>Report</MenuItem>
              </Menu>
            )}
          </Grid>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ marginLeft: "2.5rem" }}>
              <IconButton aria-label="Like">
                <ThumbUp fontSize="small" />
              </IconButton>
              <IconButton aria-label="dislike">
                <ThumbDown fontSize="small" />
              </IconButton>
            </div>
          </div>
        </CardContent>
      </div>
    </Grow>
  );
};

export default CommentReplies;
