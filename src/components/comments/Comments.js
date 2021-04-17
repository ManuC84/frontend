import React, { useState, useEffect } from "react";
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
import { logout } from "../../reducers/slice/authSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import decode from "jwt-decode";

export default function Comments({ post }) {
  const [commentsPerPage] = useState(5);
  const [page, setPage] = React.useState(1);
  const [showEditor, setShowEditor] = useState(false);
  const classes = useStyles();
  const user = useState(JSON.parse(localStorage.getItem("profile")));
  const { isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (event, value) => {
    setPage(value);
  };

  //verify Token before opening text editor
  useEffect(() => {
    const token = user[0]?.data?.token;
    //TOKEN EXPIRY
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        signout();
      }
    }
  }, [showEditor]);

  const signout = () => {
    dispatch(logout());
    history.push("/auth");
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
