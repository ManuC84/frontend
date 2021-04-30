import React, { useEffect, useState } from "react";
import makeStyles from "./styles";
import Post from "../../posts/post/Post";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../../actions/posts";
import {
  CircularProgress,
  Typography,
  Button,
  List,
  ListItem,
} from "@material-ui/core";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./styles.css";

const LastPosts = () => {
  const classes = makeStyles();
  const dispatch = useDispatch();
  const [authError, setAuthError] = useState(false);
  const { posts, isLoading, error } = useSelector((state) => state.posts);

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  return posts.length === 0 ? (
    <CircularProgress />
  ) : (
    <section className={classes.mainSection}>
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
      <div className={classes.sliderContainer}>
        <Slider {...settings}>
          <Post
            post={posts[0]}
            error={error}
            authError={authError}
            setAuthError={setAuthError}
          />

          <Post
            post={posts[1]}
            error={error}
            authError={authError}
            setAuthError={setAuthError}
          />
          <Post
            post={posts[2]}
            error={error}
            authError={authError}
            setAuthError={setAuthError}
          />
          <Post
            post={posts[3]}
            error={error}
            authError={authError}
            setAuthError={setAuthError}
          />
          <Post
            post={posts[4]}
            error={error}
            authError={authError}
            setAuthError={setAuthError}
          />
        </Slider>
      </div>
    </section>
  );
};

export default LastPosts;
