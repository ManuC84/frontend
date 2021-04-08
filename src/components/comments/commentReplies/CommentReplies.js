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
} from "@material-ui/core";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import ReadMore from "../../../utils/readMore/ReadMore";
import moment from "moment";
import { useSelector } from "react-redux";

const CommentReplies = ({ post, comment, user, commentReply }) => {
  const { isLoading } = useSelector((state) => state.posts);
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
                title={commentReply.creator[0]?.result?.name}
                alt="avatar"
                src={commentReply.creator[0]?.result?.imageUrl}
              />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography
                variant="h6"
                style={{ margin: 0, textAlign: "left", fontSize: "0.9rem" }}
              >
                {commentReply.creator[0]?.result?.name}
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
