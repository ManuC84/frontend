import React, { useEffect, useState } from "react";
import { Container, Grid, CircularProgress, LinearProgress, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import Post from "./post/Post";
import { useStyles } from "./styles";
import { fetchPosts, fetchInfiniteScroll } from "../../reducers/slice/postsSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import "./styleOverride.css";
import { fetchNotificationsTest } from "../../reducers/slice/notificationsSlice";

const Posts = () => {
  const [authError, setAuthError] = useState(false);
  const user = useState(JSON.parse(localStorage.getItem("profile")));
  const { posts, sort, language, status, error, loadMorePosts, isNotification } = useSelector(
    (state) => state.posts
  );

  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();

  let filteredPosts =
    posts.length > 1
      ? posts.filter((post) => post.image !== "/images/no-image.png" || post.provider === "Twitter")
      : posts;
  //Fetch all posts if in home
  useEffect(() => {
    if (location.pathname === "/") dispatch(fetchPosts());
  }, []);

  //Fetch notifications
  useEffect(() => {
    if (user[0])
      dispatch(
        fetchNotificationsTest(user[0]?.data?.result?._id || user[0]?.data?.result?.googleId)
      );
  }, []);

  const fetchInfinite = () => {
    if (!sort && !language) {
      dispatch(fetchInfiniteScroll({ skip: posts.length }));
    } else {
      dispatch(fetchInfiniteScroll({ skip: posts.length, sort, language }));
    }
  };

  return status === "loading" ? (
    <div className={classes.progress}>
      <CircularProgress color="secondary" />
      <Typography style={{ color: "white", marginTop: 10 }}>
        Heroku dynos loading, please be patient
      </Typography>
    </div>
  ) : filteredPosts.length === 0 && status === "succeeded" ? (
    <div className={classes.errorMessage}>
      <Alert severity="info">
        <Typography>There's no posts to show</Typography>
      </Alert>
    </div>
  ) : error.message ? (
    <div className={classes.errorMessage}>
      <Alert severity="info">
        <Typography>{error.message}</Typography>
      </Alert>
    </div>
  ) : status === "failed" && error === "Request failed with status code 404" ? (
    <div className={classes.errorMessage}>
      <Alert severity="info">
        <Typography>There's been an error, please try again in a few minutes</Typography>
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
          error === "You've reached the end" &&
          !isNotification && (
            <Alert
              style={{ display: "flex", justifyContent: "center", marginTop: 30 }}
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
