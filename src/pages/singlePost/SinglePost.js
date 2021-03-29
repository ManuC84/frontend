import React, { useEffect } from "react";

import { CircularProgress, Container } from "@material-ui/core";

import { useStyles } from "./styles";
import { getSinglePost } from "../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../../components/posts/Posts";

const SinglePost = (props) => {
  const { posts, hasReceivedData, error } = useSelector((state) => state.posts);
  const query = new URLSearchParams(props.location.search);
  const postId = query.get("id");

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(getSinglePost(postId));
  }, []);

  return !hasReceivedData ? (
    <Container className={classes.progressContainer}>
      <CircularProgress justify="center" />
    </Container>
  ) : (
    <Container className={classes.container}>
      <Posts />
    </Container>
  );
};

export default SinglePost;
