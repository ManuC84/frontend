import React from "react";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Nav from "./components/navbar/Nav";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";

function App() {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth" exact component={Auth} />
        </Switch>
      </Container>
    </BrowserRouter>
  );
}

export default App;
