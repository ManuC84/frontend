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
            textAlign:"left",
            width: "40%",
            height: 600,
          }}
        >
            <Typography variant="h3"
              style={{
                color: "white",
                fontWeight: 600,
                fontFamily: 'MuseoModerno'
              }}>¡Bienvenidx a la comunidad!</Typography>
          {/* TEXT */}
          <Typography variant="h4"
            style={{
              color: "white",
              fontWeight: 500
            }}>
            ¡Sé uno más de la comunidad FreelyComment! 
            Busca tus temas favoritos, escribe y comparte.
          </Typography>

          {/* BUTTON BIENVENIDO */}
          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{ width: "30%" }}
          >ENTRAR
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
