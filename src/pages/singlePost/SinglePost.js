import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import { CircularProgress, Container } from "@material-ui/core";

import { useStyles } from "./styles";
import { useDispatch, useSelector } from "react-redux";
import Posts from "../../components/posts/Posts";
import { fetchSinglePost } from "../../reducers/slice/postsSlice";

const SinglePost = (props) => {
  const { posts, status, error } = useSelector((state) => state.posts);

  const { id: postId } = useParams();

  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    dispatch(fetchSinglePost(postId));
  }, []);

  return status === "loading" ? (
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
