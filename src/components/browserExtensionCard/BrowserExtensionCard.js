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
    maxWidth: 250,
    position: "absolute",
    top: 150,
    left: 100,
    border: "1px solid white",
    background: "transparent",
    borderRadius: 20,
    [theme.breakpoints.down("lg")]: {
      left: 15,
    },
    [theme.breakpoints.down("1152")]: {
      display: "none",
    },
  },
}));

const BrowserExtensionCard = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Typography
        variant="h3"
        style={{ color: "white", fontSize: "32px", fontWeight: "bolder", textAlign: "center" }}
      >
        Get the Chrome extension
      </Typography>
      <Typography variant="body1" style={{ color: "white", fontSize: "14px" }}>
        With the Chrome extension (also available for Brave browser) you can check how many likes
        and comments a website has and go directly to the comments without the need of copying the
        url!
      </Typography>
      <Link
        href="https://chrome.google.com/webstore/detail/freely-comment/lgbgfbpimhcpkcnghfpjejclkokonbae"
        target="_blank"
        style={{ textDecoration: "none" }}
      >
        <Button variant="contained" color="secondary" size="medium">
          Try it here!
        </Button>
      </Link>
    </div>
  );
};

export default BrowserExtensionCard;
