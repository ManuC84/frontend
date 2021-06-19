import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import logo from "../../img/freely_comment_logo.png";
import clsx from "clsx";
import FacebookIcon from "@material-ui/icons/Facebook";
import TwitterIcon from "@material-ui/icons/Twitter";
import InstagramIcon from "@material-ui/icons/Instagram";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

function Copyright() {
  const classes = useStyles();
  return (
    <Typography variant="body2" className={classes.typography}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        Freelycomment
      </Link>{" "}
      {new Date().getFullYear()} beta version still in development
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    flexGrow: 1,
    padding: theme.spacing(3, 2),
    marginTop: "auto",
    backgroundColor: theme.palette.grey[800],
  },
  typography: {
    color: "white",
    textAlign: "center",
  },
  footerContentContainer: {
    display: "flex",
    flexDirection: "column",

    height: 200,
  },
  footerContent: {
    padding: 5,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  footerHeading: {
    marginBottom: 10,
  },
  footerLink: {
    cursor: "pointer",
    color: "white",
    "&:hover": {
      color: "#0DDDC9",
    },
  },
}));

export default function Footer() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Grid container spacing={2} alignItems="center">
        <Grid align="center" item lg={3} md={3} sm={3} xs={12}>
          <img src={logo} alt="logo" style={{ height: 50 }} />
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={12}>
          <div className={classes.footerContentContainer}>
            <div className={classes.footerHeading}>
              <Typography variant="h6" className={classes.typography}>
                Navigation
              </Typography>
            </div>
            <div>
              <Link href="/">
                <Typography
                  variant="body2"
                  className={clsx(
                    classes.typography,
                    classes.footerContent,
                    classes.footerLink
                  )}
                >
                  Home
                </Typography>
              </Link>
              <Link href="/about">
                <Typography
                  variant="body2"
                  className={clsx(
                    classes.typography,
                    classes.footerContent,
                    classes.footerLink
                  )}
                >
                  About
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  className={clsx(
                    classes.typography,
                    classes.footerContent,
                    classes.footerLink
                  )}
                >
                  Contact
                </Typography>
              </Link>
              <Link>
                <Typography
                  variant="body2"
                  className={clsx(
                    classes.typography,
                    classes.footerContent,
                    classes.footerLink
                  )}
                >
                  Blog
                </Typography>
              </Link>
            </div>
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={12}>
          <div className={classes.footerContentContainer}>
            <div className={classes.footerHeading}>
              <Typography variant="h6" className={classes.typography}>
                Links
              </Typography>
            </div>
            <div>
              <Typography
                variant="body2"
                className={clsx(
                  classes.typography,
                  classes.footerContent,
                  classes.footerLink
                )}
              >
                <FacebookIcon /> Facebook
              </Typography>
              <Typography
                variant="body2"
                className={clsx(
                  classes.typography,
                  classes.footerContent,
                  classes.footerLink
                )}
              >
                <LinkedInIcon /> Linkedin
              </Typography>
              <Typography
                variant="body2"
                className={clsx(
                  classes.typography,
                  classes.footerContent,
                  classes.footerLink
                )}
              >
                <InstagramIcon /> Instagram
              </Typography>
              <Typography
                variant="body2"
                className={clsx(
                  classes.typography,
                  classes.footerContent,
                  classes.footerLink
                )}
              >
                <TwitterIcon /> Twitter
              </Typography>
            </div>
          </div>
        </Grid>
        <Grid item lg={3} md={3} sm={3} xs={12}>
          <div className={classes.footerContentContainer}>
            <div className={classes.footerHeading}>
              <Typography variant="h6" className={classes.typography}>
                Contact
              </Typography>
            </div>
            <div>
              <Typography
                variant="body2"
                className={clsx(
                  classes.typography,
                  classes.footerContent,
                  classes.footerLink
                )}
              >
                Contact us
              </Typography>
              <Typography
                variant="body2"
                className={clsx(
                  classes.typography,
                  classes.footerContent,
                  classes.footerLink
                )}
              >
                Faq
              </Typography>
            </div>
          </div>
        </Grid>
      </Grid>
      <Copyright />
    </footer>
  );
}
