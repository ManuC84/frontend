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
import { useLocation } from "react-router";
import Post from "./post/Post";
import { useStyles } from "./styles";
import {
  fetchPosts,
  fetchInfiniteScroll,
} from "../../reducers/slice/postsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import "./styleOverride.css";

const Posts = () => {
  const [authError, setAuthError] = useState(false);
  const { posts, isLoading, status, error, loadMorePosts } = useSelector(
    (state) => state.posts
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  let filteredPosts =
    posts.length > 1
      ? posts.filter((post) => post.image !== "/images/no-image.png")
      : posts;

  useEffect(() => {
    if (location.pathname === "/") dispatch(fetchPosts());
  }, []);

  const fetchInfinite = () => {
    dispatch(fetchInfiniteScroll(posts.length));
  };

  return status === "loading" ? (
    <div className={classes.progress}>
      <CircularProgress />
    </div>
  ) : status === "failed" &&
    error.message === "Your search yielded no results, please try again" ? (
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
        next={fetchInfinite}
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
        {filteredPosts.map((post) => (
          <Post
            post={post}
            key={post._id}
            error={error}
            authError={authError}
            setAuthError={setAuthError}
          />
        ))}
      </InfiniteScroll>
    </section>
  );
};

export default Posts;
