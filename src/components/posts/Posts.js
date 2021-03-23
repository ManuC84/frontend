import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  CircularProgress,
  LinearProgress,
  Typography,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import Post from "./post/Post";
import { useStyles } from "./styles";
import { infiniteFetch } from "../../actions/posts";
import InfiniteScroll from "react-infinite-scroll-component";
import "./styleOverride.css";

const Posts = () => {
  const { posts, isLoading, error, loadMorePosts } = useSelector(
    (state) => state.posts
  );
  const classes = useStyles();
  const dispatch = useDispatch();

  const fetchImages = () => {
    dispatch(infiniteFetch(posts.length));
  };

  return isLoading ? (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  ) : error.message === "Your search yielded no results, please try again" ? (
    <div className={classes.tagError}>
      <Alert severity="info">
        <Typography>{error.message}</Typography>
      </Alert>
    </div>
  ) : (
    <section className={classes.postsContainer}>
      <InfiniteScroll
        className={classes.infiniteComponent}
        width="100%"
        dataLength={posts.length}
        next={fetchImages}
        hasMore={loadMorePosts}
        loader={
          <div className={classes.infiniteProgress}>
            <CircularProgress />
          </div>
        }
        endMessage={
          error === "You've reached the end" && (
            <Alert
              style={{ display: "flex", justifyContent: "center" }}
              severity="info"
            >
              <Typography>{error}</Typography>
            </Alert>
          )
        }
      >
        {posts.map((post) => (
          <Post post={post} key={post._id} />
        ))}
      </InfiniteScroll>
    </section>
  );
};

export default Posts;
