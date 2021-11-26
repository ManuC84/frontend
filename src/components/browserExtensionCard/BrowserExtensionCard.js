import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Link, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
    height: 300,
    maxWidth: 300,
    position: "fixed",
    top: 150,
    left: 100,
    border: "1px solid white",
    background: "transparent",
    borderRadius: 20,
    [theme.breakpoints.down("lg")]: {
      height: 300,
      maxWidth: 300,
      left: 15,
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
}));

const BrowserExtensionCard = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography variant="h3" style={{ color: "white", fontSize: "1.6rem", fontWeight: "bolder" }}>
        Get the Chrome extension
      </Typography>
      <Typography variant="body1" style={{ color: "white" }}>
        With the Chrome extension (also available for Brave browser) you can check how many likes
        and comments a website has and go directly to the comments without the need of copying the
        url!
      </Typography>
      <Link
        href="https://chrome.google.com/webstore/detail/freely-comment/lgbgfbpimhcpkcnghfpjejclkokonbae"
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <Button variant="contained" color="secondary" size="large">
          Try it here!
        </Button>
      </Link>
    </div>
  );
};

export default BrowserExtensionCard;
