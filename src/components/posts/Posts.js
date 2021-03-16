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
  var { posts, isLoading, error } = useSelector((state) => state.posts);

  const classes = useStyles();

  return isLoading ? (
    <Container className={classes.progress}>
      <CircularProgress />
    </Container>
  ) : error.message === "Your search yielded no results, please try again" ? (
    <Container className={classes.tagError}>
      <Alert severity="info">{error.message}</Alert>
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
