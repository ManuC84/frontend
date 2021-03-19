import React from "react";

import Search from "../searchbar/Search";
import Posts from "../posts/Posts";
import useStyles from "./styles";
import { useSelector } from "react-redux";

const Home = (props) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);

  return (
    <main className={classes.homeContainer}>
      <Search />
      <Posts />
    </main>
  );
};

export default Home;
