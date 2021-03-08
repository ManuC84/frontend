import React from "react";
import { Container, Grid } from "@material-ui/core";
import { useSelector } from "react-redux";
import Post from "./post/Post";
import { useStyles } from "./styles";

const Posts = () => {
  const posts = useSelector((state) => state.posts);
  const classes = useStyles();
  return (
    <Container maxWidth="lg" className={classes.root}>
      {posts.map((post) => (
        <Post post={post} key={post._id} />
      ))}
    </Container>
  );
};

export default Posts;
