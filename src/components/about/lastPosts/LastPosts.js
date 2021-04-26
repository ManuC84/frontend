import React, { useEffect, useState } from "react";
import makeStyles from "./styles";
import Post from "../../posts/post/Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../actions/posts";
import { CircularProgress, Typography, Button } from "@material-ui/core";

const LastPosts = () => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const [authError, setAuthError] = useState(false);
  const { posts, isLoading, error } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return posts.length === 0 ? (
    <CircularProgress />
  ) : (
    <section className={classes.mainSection}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "flex-start",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-evenly",
            width: "40%",
            height: 600,
          }}
        >
          <Typography variant="h4" style={{ color: "white", fontWeight: 300 }}>
            Unete ya mismo a la conversación, crea tu cuenta y empieza a
            compartir con la comunidad de FreelyComment. Aqui puedes ver las
            últimas publicaciones. También puedes ir a nuestro home page y
            buscar diferentes tipos de publicaciones con una variedad de
            filtros.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: "30%" }}
          >
            Ir a home
          </Button>
        </div>
        <Post
          post={posts[0]}
          error={error}
          authError={authError}
          setAuthError={setAuthError}
        />
      </div>
    </section>
  );
};

export default LastPosts;
