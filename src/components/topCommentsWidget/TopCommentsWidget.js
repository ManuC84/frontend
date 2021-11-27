import React, { useEffect } from "react";
import { Avatar, Badge, CircularProgress, Paper } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import ReadMore from "../../utils/readMore/ReadMore";
import clsx from "clsx";
import Trophies from "../../img/trophies.png";
import { fetchTopComments } from "../../reducers/slice/commentsSlice";
import { toggleIsTopComment } from "../../reducers/slice/postsSlice";
import { ThumbUp } from "@material-ui/icons";
import { fetchSinglePost } from "../../reducers/slice/postsSlice";
import { fetchSingleComment } from "../../reducers/slice/commentsSlice";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    maxWidth: 250,
    position: "absolute",
    top: 230,
    right: 50,

    // [theme.breakpoints.down("xl")]: {
    //   maxWidth: 350,
    //   right: 200,
    // },
    //
    [theme.breakpoints.down("1152")]: {
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
  avatar3: {
    position: "absolute",
    top: -55,
    right: 15,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  avatar1: {
    position: "absolute",
    top: -65,
    right: 110,
    width: theme.spacing(8),
    height: theme.spacing(8),
  },
  avatar2: {
    position: "absolute",
    top: -55,
    right: 226,
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  trophies: {
    position: "absolute",
    top: -150,
    right: -5,
  },
}));

const TopCommentsWidget = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { topComments, topCommentStatus } = useSelector((state) => state.comments);
  useEffect(() => {
    dispatch(fetchTopComments());
  }, []);

  return topCommentStatus === "loading" ? (
    <CircularProgress style={{ position: "absolute", right: 100, top: 230, color: "white" }} />
  ) : (
    <div className={classes.mainContainer}>
      <Paper className={classes.paper}>
        <h1 style={{ fontSize: 24 }}>Top Comments</h1>
        <img src={Trophies} className={classes.trophies} />

        {topComments.map((comment, i) => (
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
                cursor: "pointer",
              }}
              elevation={2}
              onClick={() => {
                dispatch(fetchSinglePost(comment.parentPostId));
                dispatch(
                  fetchSingleComment({ postId: comment.parentPostId, commentId: comment._id })
                );
                dispatch(toggleIsTopComment(true));
              }}
            >
              <h3 style={{ fontSize: 18 }}>{`${i + 1}st - ` + comment.creator[0].name}</h3>
              <ReadMore
                lines={200}
                content={comment.comment}
                variant={"body2"}
                color={"textPrimary"}
              />
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: 40,
                }}
              >
                <ThumbUp color="primary" />
                {comment.likes.length}
              </div>
            </Paper>
          </React.Fragment>
        ))}
      </Paper>
    </div>
  );
};

export default TopCommentsWidget;
