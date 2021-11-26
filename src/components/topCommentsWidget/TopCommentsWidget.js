import React from "react";
import { Avatar, Badge, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector } from "react-redux";
import ReadMore from "../../utils/readMore/ReadMore";
import clsx from "clsx";
import Trophies from "../../img/trophies.png";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    maxWidth: 350,
    position: "fixed",
    top: 230,
    right: 120,

    [theme.breakpoints.down("lg")]: {
      maxWidth: 350,
      right: 42,
    },
    [theme.breakpoints.down("md")]: {
      display: "none",
    },
  },
  paper: {
    position: "relative",
    height: "100%",
    width: "100%",
    padding: 20,
    marginBottom: 10,
  },
  avatar1: {
    position: "fixed",
    top: 165,
    right: 20,
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  avatar2: {
    position: "fixed",
    top: 155,
    right: 135,
    width: theme.spacing(10),
    height: theme.spacing(10),
  },
  avatar3: {
    position: "fixed",
    top: 165,
    right: 265,
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  trophies: {
    position: "fixed",
    top: 60,
    right: 0,
  },
}));

const TopCommentsWidget = () => {
  const classes = useStyles();
  const { comments } = useSelector((state) => state.comments);
  console.log(comments);
  return (
    <div className={classes.mainContainer}>
      <Paper className={classes.paper}>
        <h1>Top Comments</h1>
        <img src={Trophies} className={classes.trophies} />

        {comments.map((comment, i) => (
          <React.Fragment key={comment.id}>
            <Avatar
              src={comment.creator[0].imageUrl}
              className={clsx({
                [classes.avatar1]: i === 0,
                [classes.avatar2]: i === 1,
                [classes.avatar3]: i === 2,
              })}
            />
            <Paper
              style={{
                padding: "20px",
                marginBottom: "10px",
                backgroundColor: "#f9fafb",
              }}
              elevation={2}
            >
              <h3>{comment.creator[0].name}</h3>
              <ReadMore
                lines={200}
                content={comment.comment}
                variant={"body2"}
                color={"textPrimary"}
              />
            </Paper>
          </React.Fragment>
        ))}
      </Paper>
    </div>
  );
};

export default TopCommentsWidget;
