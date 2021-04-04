import React from "react";
import { Container, Fab, Toolbar } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/navbar/Nav";
import Home from "./pages/home/Home";
import Auth from "./pages/auth/Auth";
import RedirectToMain from "../../frontend/src/utils/RedirectToMain";
import SinglePost from "./pages/singlePost/SinglePost";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import ScrollTop from "../../frontend/src/utils/ScrollToTop";

function App(props) {
  return (
    <BrowserRouter>
      <Container maxWidth="xl">
        <Nav appProps={props} />
        <Toolbar id="back-to-top-anchor" />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
          <Route path="/posts/:id" exact component={SinglePost} />
          <Route component={RedirectToMain} />
        </Switch>
      </Container>
      <ScrollTop {...props}>
        <Fab color="primary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </BrowserRouter>
  );
}

export default App;
