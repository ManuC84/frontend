import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import { Link, TextField, Button } from "@material-ui/core";
import clsx from "clsx";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Collapse,
  Avatar,
  IconButton,
  Typography,
  Fade,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ThumbUp, ThumbDown } from "@material-ui/icons";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import { useStyles } from "./styles";
import { addTag } from "../../../actions/posts";
import { useDispatch, useSelector } from "react-redux";
import Comments from "../../comments/Comments";
import ReadMore from "../../../utils/readMore/ReadMore";
import { TwitterTweetEmbed } from "react-twitter-embed";
import AlertDialog from "../../../utils/AlertDialog";
import { useGlobalContext } from "../../../context";
import { getComments } from "../../../actions/comments";
import { likePost, dislikePost } from "../../../reducers/slice/postsSlice";

const Post = ({ post, error, authError, setAuthError }) => {
  const [expanded, setExpanded] = useState(false);
  const [showLikeAuthAlert, setShowLikeAuthAlert] = useState(false);

  const { posts, isNotification, status } = useSelector((state) => state.posts);
  const [tag, setTag] = useState("");
  const [addTagError, setAddTagError] = useState({ error: "", bool: false });
  const user = useState(JSON.parse(localStorage.getItem("profile")));
  const userId =
    user[0] && (user[0]?.data?.result?.googleId || user[0]?.data?.result?._id);

  const tweetId = post?.url.split("/").slice(-1)[0];

  const textRef = useRef(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  //Fetch comments length
  // useEffect(() => {
  //   dispatch(fetchComments(post._id));
  // }, []);

  useEffect(() => {
    if (isNotification) setExpanded(true);
  }, [isNotification]);

  //Listen to authError from backend
  useEffect(() => {
    if (status === "failed" && error.authError) {
      return setAuthError(true);
    }
  }, [error]);

  //Use ReactPlayer for streaming urls
  var streamingProviders = [
    "youtube",
    "facebook",
    "twitch",
    "soundcloud",
    "vimeo",
    "wistia",
    "mixcloud",
    "dailymotion",
    "kaltura",
  ];
  var isStreaming = new RegExp(streamingProviders.join("|")).test(post.url);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!expanded) dispatch(getComments(post._id));
  };

  const handleLikePost = () => {
    if (user[0]) dispatch(likePost({ postId: post._id, userId: userId }));
  };

  const handleDislikePost = () => {
    if (user[0]) dispatch(dislikePost({ postId: post._id, userId: userId }));
  };

  const handleAddTags = (e) => {
    e.preventDefault();
    for (let i = 0; i < posts.length; i++) {
      if (posts[i]._id === post._id && posts[i].tags.includes(tag)) {
        setAddTagError({
          error: "This tag already exists",
          bool: true,
          postsId: posts[i]._id,
        });
        return;
      }
    }
    dispatch(addTag(post._id, { tag: tag }));
    setTag("");
    textRef.current.value = "";
    setAddTagError({ bool: false });
  };

  // Set timeout for addTag error
  useEffect(() => {
    if (addTagError.bool) {
      setTimeout(() => {
        setAddTagError({ bool: false });
      }, 5000);
    }
  }, [addTagError.bool]);

  return (
    <>
      <AlertDialog
        textContent={"Please log in again to proceed"}
        yesButton={"Go to log in page"}
        noButton={"cancel"}
        authError={authError}
        setAuthError={setAuthError}
      />

      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              aria-label="recipe"
              className={classes.avatar}
              alt="avatar"
              title={post.provider}
              src={post.icon}
            />
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={
            <>
              <Link href={post.url} target="_blank" title="Go to website">
                <Typography
                  style={{ fontSize: "1rem", display: "inline" }}
                  variant="body1"
                >
                  {post.provider}
                </Typography>
              </Link>
            </>
          }
          subheader={
            <Link
              href={`posts/${post._id}`}
              style={{ textDecorations: "none", color: "inherit" }}
              title="Go to post"
            >
              <>
                {post.creator[0]?.name
                  ? "Created by " + post.creator[0]?.name
                  : "Created by Annonymous"}

                {" - " + moment(post.createdAt).fromNow()}
              </>
            </Link>
          }
        />

        {/* RENDER IMAGE OR VIDEO CONDITIONALLY */}
        {isStreaming && post?.type?.includes("video") ? (
          <div style={{ position: "relative", paddingTop: "56.25%" }}>
            <ReactPlayer
              url={post.url}
              style={{ position: "absolute", top: "0", left: "0" }}
              width="100%"
              height="100%"
              config={{
                vimeo: {
                  playerOptions: {
                    controls: true,
                  },
                },
                dailymotion: {
                  params: {
                    controls: true,
                  },
                },
              }}
            />
          </div>
        ) : post?.provider === "Twitter" ? (
          <CardContent
            style={{
              margin: "0 auto",
              paddingTop: "0",
            }}
          >
            <TwitterTweetEmbed tweetId={tweetId} />
          </CardContent>
        ) : (
          <Link href={post.image} target="_blank" title="Go to image">
            <CardMedia
              className={classes.media}
              image={post.image}
              title="image"
            />
          </Link>
        )}

        {post?.provider !== "Twitter" && (
          <CardContent>
            <Typography variant="h6" style={{ fontSize: "1rem" }}>
              {post.title}
            </Typography>
            <ReadMore
              lines={200}
              content={post.description}
              variant={"body2"}
              color={"textSecondary"}
            />
          </CardContent>
        )}
        {/* LIKE AND DISLIKE BUTTONS */}
        <CardActions className={classes.cardActionsSocial} disableSpacing>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <div
              onClick={handleLikePost}
              onMouseEnter={() => setShowLikeAuthAlert(true)}
              onMouseLeave={() => setShowLikeAuthAlert(false)}
            >
              <IconButton
                aria-label="Like"
                disabled={!user[0]}
                color={post.likes.includes(userId) ? "primary" : "default"}
              >
                <ThumbUp />
              </IconButton>
            </div>

            {post.likes.length - post.dislikes.length}
            <div
              onClick={handleDislikePost}
              onMouseEnter={() => setShowLikeAuthAlert(true)}
              onMouseLeave={() => setShowLikeAuthAlert(false)}
            >
              <IconButton
                aria-label="dislike"
                disabled={!user[0]}
                color={post.dislikes.includes(userId) ? "secondary" : "default"}
              >
                <ThumbDown />
              </IconButton>
            </div>
            <div>
              <IconButton aria-label="share">
                <ShareIcon />
              </IconButton>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              variant="button"
              color="textSecondary"
              style={{ marginRight: "5px" }}
            >
              {!expanded ? "Show Comments" : "Hide Comments"}
            </Typography>
            <Typography
              style={{ lineHeight: "0" }}
              color="textSecondary"
              variant="button"
            >
              {post?.comments?.length}
            </Typography>
            <IconButton
              className={clsx(classes.expand, {
                [classes.expandOpen]: expanded,
              })}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </div>
        </CardActions>
        {/* Like and dislike auth alert */}
        {!user[0] && (
          <Collapse in={showLikeAuthAlert}>
            <CardContent style={{ padding: "0" }}>
              {showLikeAuthAlert && (
                <Alert severity="info">
                  Please log in to like and dislike posts
                </Alert>
              )}
            </CardContent>
          </Collapse>
        )}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{ paddingTop: "0" }}>
            <Comments post={post} error={error} />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default Post;
