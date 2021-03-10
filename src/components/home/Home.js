import React from "react";
import { Container, Grow } from "@material-ui/core";
import Search from "../searchbar/Search";
import Posts from "../posts/Posts";
import useStyles from "./styles";

const Home = () => {
  const classes = useStyles();

  return (
    <Container>
      <Search />
      <Posts />
    </Container>
  );
};

export default Home;
