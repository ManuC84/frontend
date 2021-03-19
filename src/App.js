import React from "react";
import { Container, Fab, Toolbar } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/navbar/Nav";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ScrollTop from "../../frontend/src/utils/ScrollToTop";

function App(props) {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Nav />
        <Toolbar id="back-to-top-anchor" />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </BrowserRouter>
  );
}

export default App;
