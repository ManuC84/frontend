import React, { useEffect } from "react";

import Search from "../../components/searchbar/Search";
import Posts from "../../components/posts/Posts";
import useStyles from "./styles";
import { useSelector } from "react-redux";
import { Container } from "@material-ui/core";
import { fetchComments } from "../../reducers/slice/commentsSlice";
import { useDispatch } from "react-redux";

const Home = (props) => {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();

  return (
    <Container className={classes.homeContainer}>
      <Search />
      <Posts />
    </Container>
  );
};

export default Home;
