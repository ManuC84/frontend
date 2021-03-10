import React from "react";
import { Container, Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./post/Post";
import { useStyles } from "./styles";

const Posts = () => {
  var posts = useSelector((state) => state.posts);
  const classes = useStyles();
  return !posts.length ? (
    <Container className={classes.progress}>
      <CircularProgress />
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
