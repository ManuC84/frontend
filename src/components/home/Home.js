import React from "react";
import { Container, Grow } from "@material-ui/core";
import Search from "../searchbar/Search";
import Posts from "../posts/Posts";
import useStyles from "./styles";
import { useSelector } from "react-redux";

const Home = () => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  return (
    <Container>
      <Search />
      <Posts />
    </Container>
  );
};

export default Home;
