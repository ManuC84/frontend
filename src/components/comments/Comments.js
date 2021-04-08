import React, { useState } from "react";
import {
  CircularProgress,
  Typography,
  Paper,
  Button,
  Collapse,
} from "@material-ui/core";
import TextEditor from "../textEditor/TextEditor";
import { useStyles } from "./styles";
import Comment from "./comment/Comment";
import { useSelector } from "react-redux";
import Pagination from "@material-ui/lab/Pagination";

export default function Comments({ post }) {
  const [commentsPerPage] = useState(5);
  const [page, setPage] = React.useState(1);
  const [showEditor, setShowEditor] = useState(false);
  const classes = useStyles();
  const user = useState(JSON.parse(localStorage.getItem("profile")));
  const { isLoading } = useSelector((state) => state.posts);

  const handleChange = (event, value) => {
    setPage(value);
  };

  // Get current comments
  const indexOfLastComment = page * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = post.comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  return isLoading ? (
    <CircularProgress />
  ) : (
    <div className="App">
      {!showEditor && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{ margin: "10px 0" }}
            color="primary"
            variant="outlined"
            onClick={() => setShowEditor(true)}
          >
            Write a comment
          </Button>
        </div>
      )}
      <Collapse in={showEditor} timeout="auto">
        <TextEditor
          post={post}
          user={user}
          type={"comments"}
          setShowEditor={setShowEditor}
        />
      </Collapse>

      <h3 style={{ margin: "0 0 10px 0" }}>Comments</h3>
      {post.comments.length === 0 ? (
        <Paper>
          <Typography variant="body2" style={{ padding: "1rem" }}>
            This post has no comments yet. Be the first to comment!
          </Typography>
        </Paper>
      ) : (
        currentComments.map((comment) => (
          <Comment
            comment={comment}
            user={user}
            post={post}
            key={comment._id}
          />
        ))
      )}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          style={{ marginTop: "16px" }}
          page={page}
          onChange={handleChange}
          align="center"
          count={Math.ceil(post.comments.length / 5)}
          variant="outlined"
          shape="rounded"
        />
      </div>
    </div>
  );
}
