import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Grow,
  Collapse,
  IconButton,
  CardContent,
  Divider,
  Button,
} from "@material-ui/core";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import Pagination from "@material-ui/lab/Pagination";

import { useStyles } from "./styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReadMore from "../../../utils/readMore/ReadMore";
import clsx from "clsx";
import TextEditor from "../../textEditor/TextEditor";
import { getCommentReplies } from "../../../actions/comments";
import moment from "moment";
import CommentReplies from "../commentReplies/CommentReplies";
import { useDispatch } from "react-redux";

const Comment = ({ comment, user, post }) => {
  const [expanded, setExpanded] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [page, setPage] = React.useState(1);
  const [commentsPerPage] = useState(5);

  const classes = useStyles();
  const dispatch = useDispatch();

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Get current comments
  const indexOfLastComment = page * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comment.commentReplies.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handleExpandClick = () => {
    dispatch(getCommentReplies(post._id, comment._id));
    setExpanded(!expanded);
  };

  return (
    <Grow in={true}>
      <Paper
        style={{
          padding: "20px 20px 0 20px",
          marginBottom: "10px",
          backgroundColor: "#f9fafb",
        }}
        elevation={2}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar
              title={comment.creator[0]?.result?.name}
              alt="avatar"
              src={comment.creator[0]?.result?.imageUrl}
            />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography
              variant="h6"
              style={{ margin: 0, textAlign: "left", fontSize: "0.9rem" }}
            >
              {comment.creator[0]?.result?.name}
            </Typography>
            <Typography
              style={{ textAlign: "left", color: "gray", fontSize: "0.8rem" }}
            >
              {moment(comment.createdAt).fromNow()}
            </Typography>
            <ReadMore
              lines={200}
              content={comment.comment}
              variant={"body2"}
              color={"textPrimary"}
            />

            {/* <Typography
                variant="body2"
                style={{ textAlign: "left", padding: "10px 0" }}
                dangerouslySetInnerHTML={{ __html: comment.comment }}
              ></Typography> */}
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
          <div>
            <Typography
              variant="button"
              color="textSecondary"
              style={{ height: "20px" }}
            >
              {!expanded ? "Show Replies" : "Hide Replies"}
            </Typography>

            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </div>
        {/* COMMENT REPLIES */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {!showEditor && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{ margin: "10px 0" }}
                color="primary"
                variant="outlined"
                onClick={() => setShowEditor(true)}
              >
                Reply to comment
              </Button>
            </div>
          )}
          <Collapse in={showEditor} timeout="auto">
            <TextEditor
              post={post}
              comment={comment}
              user={user}
              type={"commentReplies"}
              setShowEditor={setShowEditor}
            />
          </Collapse>
          {currentComments.map((commentReply) => (
            <CommentReplies
              key={commentReply._id}
              post={post}
              user={user}
              comment={comment}
              commentReply={commentReply}
            />
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "16px",
            }}
          >
            <Pagination
              style={{ marginTop: "16px" }}
              page={page}
              onChange={handleChange}
              align="center"
              count={Math.ceil(comment.commentReplies.length / 5)}
              variant="outlined"
              shape="rounded"
            />
          </div>
        </Collapse>
      </Paper>
    </Grow>
  );
};

export default Comment;
