import React, { useEffect, useState } from "react";
import makeStyles from "./styles";
import Post from "../../posts/post/Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../actions/posts";
import { CircularProgress, Typography, Button, List, ListItem } from "@material-ui/core";

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
      <div className={classes.box}>
        <div className={classes.boxSection}>
          
          {/* TITTLE */}
          <div className={classes.Title}>
            <ListItem>¡Bienvenidx a la comunidad!</ListItem>
            {/* <ListItem>a la </ListItem>
            <ListItem>comunidad</ListItem> */}
          </div>

          {/* TEXT */}
          <List className={classes.Subtitol}>
            <ListItem>¡Sé uno/a más de la comunidad FreelyComment!</ListItem>
            <ListItem>Busca tus temas favoritos, escribe y comparte. </ListItem>
          </List>

          {/* BUTTON BIENVENIDO */}
          <Button className={classes.ColorButton}>BIENVENIDO</Button>

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
