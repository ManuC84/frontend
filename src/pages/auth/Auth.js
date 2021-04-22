import React, { useState, useEffect } from "react";
import { GoogleLogin } from "react-google-login";
import { useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useStyles } from "./styles";
import { auth } from "../../reducers/slice/authSlice";
import { signin, signup } from "../../actions/auth";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import {
  OutlinedInput,
  FormControl,
  InputLabel,
  IconButton,
  InputAdornment,
  Paper,
  Container,
  Typography,
  Box,
  Grid,
  Link,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
  Avatar,
  Collapse,
} from "@material-ui/core/";
import { useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import { clearError } from "../../reducers/slice/authSlice";

function Copyright() {
  return (
    <Typography variant="body2" style={{ color: "white" }} align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        FreelyComment
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const initialState = {
  userName: "",
  email: "",
  password: "",
  repeatPassword: "",
};

export default function Auth() {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const { error } = useSelector((state) => state.auth);

  useEffect(() => {
    setErrorMessages(error);
  }, [error]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [error]);

  const user = JSON.parse(localStorage.getItem("profile"));

  const switchMode = () => {
    dispatch(clearError());
    setIsSignup((prev) => !prev);
    setFormData(initialState);
  };

  const handleShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  //JWB auth
  const handleSubmit = (e) => {
    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Google OAUTH
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch(auth({ data: { result, token } }));
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log("Google sign in was unsuccessful. Try Again later");
  };

  return !user ? (
    <Container component="main" maxWidth="xs" className={classes.container}>
      <Paper elevation={3} className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        {isSignup ? (
          <>
            {" "}
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="uname"
                    name="userName"
                    variant="outlined"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    autoFocus
                    onChange={handleChange}
                  />

                  {errorMessages?.userNameError && (
                    <Alert severity="error">
                      {errorMessages?.userNameError}
                    </Alert>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleChange}
                  />
                  {errorMessages?.emailError && (
                    <Alert severity="error">{errorMessages?.emailError}</Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.textField}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      variant="outlined"
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="repeatPassword"
                    label="Repeat Password"
                    type="password"
                    id="repeatPassword"
                    autoComplete="current-password"
                    onChange={handleChange}
                  />
                  {errorMessages?.passwordError && (
                    <Alert severity="error">
                      {errorMessages?.passwordError}
                    </Alert>
                  )}
                </Grid>
                <Grid item xs={12}></Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link href="#" variant="body2" onClick={switchMode}>
                    Already have an account? Sign in
                  </Link>
                </Grid>
              </Grid>
            </form>
          </>
        ) : (
          <>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleChange}
                    style={{ margin: "0" }}
                  />
                  {errorMessages?.emailError && (
                    <Alert severity="error">{errorMessages?.emailError}</Alert>
                  )}
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    required
                    variant="outlined"
                    className={classes.textField}
                  >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      id="password"
                      autoComplete="current-password"
                      onChange={handleChange}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleShowPassword}
                            onMouseDown={handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    {errorMessages?.passwordError && (
                      <Alert severity="error">
                        {errorMessages?.passwordError}
                      </Alert>
                    )}
                  </FormControl>
                </Grid>
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                >
                  Sign In
                </Button>
                {/* GOOGLE OAUTH BUTTON */}
                <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                  render={(renderProps) => (
                    <Button
                      type="submit"
                      fullWidth
                      onClick={renderProps.onClick}
                      variant="contained"
                      color="secondary"
                      className={classes.submit}
                    >
                      Google Sign In
                    </Button>
                  )}
                  onSuccess={googleSuccess}
                  onFailure={googleFailure}
                  cookiePolicy="single_host_origin"
                />

                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2" onClick={switchMode}>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Grid>
            </form>
          </>
        )}
      </Paper>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  ) : (
    <Redirect to={"/"} />
  );
}
