import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/navbar/Nav";
import Search from "./components/searchbar/Search";
import Posts from "./components/posts/Posts";

function App() {
  return (
    <Container maxWidth="lg">
      <Nav />
      <Search />
      <Posts />
    </Container>
  );
}

export default App;
