import React from 'react';
import { Fab, Toolbar } from '@material-ui/core';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Nav from './components/navbar/Nav';
import Home from './pages/home/Home';
import Auth from './pages/auth/Auth';
import RedirectToMain from '../src/utils/RedirectToMain';
import SinglePost from './pages/singlePost/SinglePost';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import ScrollTop from '../src/utils/ScrollToTop';
import About from './pages/about/About';
import Footer from './components/footer/Footer';

function App(props) {
  return (
    <BrowserRouter>
      <Nav appProps={props} />
      <Toolbar id="back-to-top-anchor" />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/auth" exact component={Auth} />
        <Route path="/posts/:id" exact component={SinglePost} />
        <Route path="/about" exact component={About} />
        <Route component={RedirectToMain} />
      </Switch>
      <Footer />

      <ScrollTop {...props}>
        <Fab color="secondary" size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </BrowserRouter>
  );
}

export default App;
