import React, { useEffect } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import Marquee from "react-fast-marquee";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostsByTags } from "../../actions/posts";
import { fetchTrendingTags } from "../../reducers/slice/postsSlice";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#424242",
    height: 300,
    width: 300,
    position: "absolute",
    top: 550,
    left: 100,
    borderRadius: 20,
    overflow: "hidden",
    [theme.breakpoints.down("lg")]: {
      left: 15,
    },
    [theme.breakpoints.down("1152")]: {
      display: "none",
    },
  },
  header: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  chipContainer: {
    overflow: "hidden",
  },
  chips: {
    "& > div:nth-child(odd)": {
      backgroundColor: "#5ffbf1",
      color: "#424242",
    },
    "& > div:nth-child(even)": {
      backgroundColor: "#aa8fd8",
      color: "white",
    },
  },
  chips2: {
    "& > div:nth-child(even)": {
      backgroundColor: "#5ffbf1",
      color: "#424242",
    },
    "& > div:nth-child(odd)": {
      backgroundColor: "#aa8fd8",
      color: "white",
    },
  },
  chip: {
    margin: theme.spacing(1),
    cursor: "pointer",

    // backgroundColor: "#5ffbf1",
    // color: "#424242",
  },

  circularProgress: {
    color: "white",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const TrendingTopics = () => {
  const { posts, trendingTags, trendingTagsStatus } = useSelector((state) => state.posts);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchTrendingTags());
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h1 style={{ color: "white" }}>Trending Topics</h1>
      </div>
      {trendingTagsStatus === "loading" ? (
        <CircularProgress className={classes.circularProgress} />
      ) : (
        <>
          <Marquee
            gradient={true}
            gradientWidth={10}
            gradientColor={[66, 66, 66]}
            pauseOnHover={true}
          >
            <div className={classes.chips}>
              {trendingTags.slice(0, 9).map((value, i) => (
                <Chip
                  onClick={() => dispatch(fetchPostsByTags({ tags: [value] }))}
                  className={classes.chip}
                  key={value}
                  label={value}
                />
              ))}
            </div>
          </Marquee>
          <Marquee
            gradient={true}
            gradientWidth={10}
            gradientColor={[66, 66, 66]}
            speed={15}
            pauseOnHover={true}
          >
            <div className={classes.chips2}>
              {trendingTags.slice(10, 20).map((value, i) => (
                <Chip
                  onClick={() => dispatch(fetchPostsByTags({ tags: [value] }))}
                  className={classes.chip}
                  key={value}
                  label={value}
                />
              ))}
            </div>
          </Marquee>
          <Marquee
            gradient={true}
            gradientWidth={10}
            gradientColor={[66, 66, 66]}
            pauseOnHover={true}
          >
            <div className={classes.chips}>
              {trendingTags.slice(21, 30).map((value, i) => (
                <Chip
                  onClick={() => dispatch(fetchPostsByTags({ tags: [value] }))}
                  className={classes.chip}
                  key={value}
                  label={value}
                />
              ))}
            </div>
          </Marquee>
          <Marquee
            gradient={true}
            gradientWidth={10}
            gradientColor={[66, 66, 66]}
            speed={15}
            pauseOnHover={true}
          >
            <div className={classes.chips2}>
              {trendingTags.slice(31, 40).map((value, i) => (
                <Chip
                  onClick={() => dispatch(fetchPostsByTags({ tags: [value] }))}
                  className={classes.chip}
                  key={value}
                  label={value}
                />
              ))}
            </div>
          </Marquee>
        </>
      )}
    </div>
  );
};

export default TrendingTopics;
