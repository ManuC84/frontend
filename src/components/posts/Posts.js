import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  CircularProgress,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector } from "react-redux";
import Post from "./post/Post";
import { useStyles } from "./styles";

const Posts = () => {
  var posts = useSelector((state) => state.posts);

  const classes = useStyles();

  return !posts.length && typeof posts.errorMessage === "undefined" ? (
    <Container className={classes.progress}>
      <CircularProgress />
    </Container>
  ) : typeof posts.errorMessage !== "undefined" ? (
    <Container className={classes.tagError}>
      <Alert severity="info">{posts.errorMessage}</Alert>
    </Container>
  ) : (
    <Container maxWidth="lg" className={classes.root}>
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </Container>
  );
};

export default Posts;
