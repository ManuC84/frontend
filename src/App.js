import React from 'react';
import { Fab, Snackbar, Toolbar } from '@material-ui/core';
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
import { Alert } from '@material-ui/lab';
import { useGlobalContext } from './context';

function App(props) {
  const { snackbarOpen, setSnackbarOpen } = useGlobalContext();

  //Close notification info snackbar
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };
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

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleClose} severity="error">
          You have a new notification
        </Alert>
      </Snackbar>
    </BrowserRouter>
  );
}

export default App;
