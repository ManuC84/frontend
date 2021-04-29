import React from "react";

import Search from "../../components/searchbar/Search";
import Posts from "../../components/posts/Posts";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";

const Home = (props) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  return (
    <Container className={classes.homeContainer}>
      <Search />
      <Posts />
    </Container>
  );
};

export default Home;
