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
  CircularProgress,
  Menu,
  MenuItem,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import LinkIcon from "@material-ui/icons/Link";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { ThumbUp, ThumbDown, SettingsPowerTwoTone } from "@material-ui/icons";
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
import { fetchComments, filterNotificationComment } from "../../../reducers/slice/commentsSlice";
import { sortFunctionAsc, sortFunctionDesc } from "../../../utils/Sort";
import Tags from "../../tags/Tags";
import {
  FacebookShareButton,
  FacebookIcon,
  InstapaperShareButton,
  InstapaperIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from "react-share";

const Post = ({ post, error, authError, setAuthError }) => {
  const [expanded, setExpanded] = useState(false);
  const [showLikeAuthAlert, setShowLikeAuthAlert] = useState(false);
  const [tweetLoading, setTweetLoading] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorElSocial, setAnchorElSocial] = React.useState(null);
  const [openTagModal, setOpenTagModal] = React.useState(false);
  const textRef = useRef(null);

  const { posts, isNotification, isTopComment } = useSelector((state) => state.posts);
  const { comments } = useSelector((state) => state.comments);

  const dispatch = useDispatch();
  const classes = useStyles();

  const user = useState(JSON.parse(localStorage.getItem("profile")));
  const userId = user[0] && (user[0]?.data?.result?.googleId || user[0]?.data?.result?._id);

  const ShowTweetEmbed = () => {
    return (
      <TwitterTweetEmbed
        tweetId={tweetId}
        onLoad={(tweet) => {
          if (tweet) setTweetLoading(false);
        }}
      />
    );
  };

  const tweetId = post?.url.split("/").slice(-1)[0];

  //Dropdown menu
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Social share menu
  const handleSocialShareClick = (event) => {
    setAnchorElSocial(event.currentTarget);
  };

  const handleSocialShareClose = () => {
    setAnchorElSocial(null);
  };

  //Fetch comments on post render from comments db
  useEffect(() => {
    if (!isNotification && !isTopComment) dispatch(fetchComments(post._id));
  }, []);

  //Pending to find solution for error when comment has been deleted and db returns null
  const postComments =
    comments[0] !== null
      ? comments.filter((comment) => comment.parentPostId === post._id).sort(sortFunctionDesc)
      : [];

  useEffect(() => {
    if (isNotification || isTopComment) setExpanded(true);
  }, [isNotification, isTopComment]);

  //Listen to authError from backend
  useEffect(() => {
    if (error.authError) {
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
    if (!expanded) dispatch(fetchComments(post._id));
  };

  const handleLikePost = () => {
    if (user[0]) dispatch(likePost({ postId: post._id, userId: userId }));
  };

  const handleDislikePost = () => {
    if (user[0]) dispatch(dislikePost({ postId: post._id, userId: userId }));
  };

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
            <>
              <IconButton onClick={handleClick} aria-label="settings">
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClick={handleClose}
                onClose={handleClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
              >
                <MenuItem>Report</MenuItem>
                <MenuItem onClick={() => setOpenTagModal(true)}>Tags</MenuItem>
              </Menu>
              <Tags
                openTagModal={openTagModal}
                setOpenTagModal={setOpenTagModal}
                post={post}
                posts={posts}
              />
            </>
          }
          title={
            <>
              <Link href={post.url} target="_blank" title="Go to website">
                <Typography style={{ fontSize: "1rem", display: "inline" }} variant="body1">
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
            {tweetLoading ? (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <CircularProgress />
                <ShowTweetEmbed></ShowTweetEmbed>
              </div>
            ) : (
              <ShowTweetEmbed></ShowTweetEmbed>
            )}
          </CardContent>
        ) : (
          <Link href={post.url} target="_blank" title="Go to website">
            <CardMedia className={classes.media} image={post.image} title="go to website" />
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
            {post.likes.length}
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
            {post.dislikes.length}

            <div>
              <IconButton onClick={handleSocialShareClick} aria-label="share">
                <ShareIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorElSocial}
                keepMounted
                open={Boolean(anchorElSocial)}
                onClick={handleSocialShareClose}
                onClose={handleSocialShareClose}
                getContentAnchorEl={null}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                transformOrigin={{
                  vertical: "bottom",
                  horizontal: "center",
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `https://freelycomment.netlify.app/posts/${post._id}`
                    );
                    alert("Link copied to clipboard");
                  }}
                >
                  <LinkIcon style={{ marginRight: 5 }} />
                  Copy Link
                </MenuItem>
                <FacebookShareButton
                  style={{ display: "flex", alignItems: "center" }}
                  url={`https://freelycomment.netlify.app/posts/${post._id}`}
                  title={post.title}
                >
                  <MenuItem>
                    <FacebookIcon size={25} round={true} style={{ marginRight: 5 }} />
                    Facebook
                  </MenuItem>
                </FacebookShareButton>
                <MenuItem>
                  <TwitterShareButton
                    style={{ display: "flex", alignItems: "center" }}
                    url={`https://freelycomment.netlify.app/posts/${post._id}`}
                    title={post.title}
                  >
                    <TwitterIcon size={25} round={true} style={{ marginRight: 5 }} />
                    Twitter
                  </TwitterShareButton>
                </MenuItem>
                <MenuItem>
                  <RedditShareButton
                    style={{ display: "flex", alignItems: "center" }}
                    url={`https://freelycomment.netlify.app/posts/${post._id}`}
                    title={post.title}
                  >
                    <RedditIcon size={25} round={true} style={{ marginRight: 5 }} />
                    Reddit
                  </RedditShareButton>
                </MenuItem>
                <MenuItem>
                  <LinkedinShareButton
                    style={{ display: "flex", alignItems: "center" }}
                    url={`https://freelycomment.netlify.app/posts/${post._id}`}
                    title={post.title}
                  >
                    <LinkedinIcon size={25} round={true} style={{ marginRight: 5 }} />
                    Linkedin
                  </LinkedinShareButton>
                </MenuItem>
                <MenuItem>
                  <InstapaperShareButton
                    style={{ display: "flex", alignItems: "center" }}
                    url={`https://freelycomment.netlify.app/posts/${post._id}`}
                    title={post.title}
                  >
                    <InstapaperIcon size={25} round={true} style={{ marginRight: 5 }} />
                    Instagram
                  </InstapaperShareButton>
                </MenuItem>
                <MenuItem>
                  <TelegramShareButton
                    style={{ display: "flex", alignItems: "center" }}
                    url={`https://freelycomment.netlify.app/posts/${post._id}`}
                    title={post.title}
                  >
                    <TelegramIcon size={25} round={true} style={{ marginRight: 5 }} />
                    Telegram
                  </TelegramShareButton>
                </MenuItem>
              </Menu>
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
              style={{ marginRight: "5px", lineHeight: "0" }}
            >
              {!expanded ? "Show Comments" : "Hide Comments"}
            </Typography>
            <Typography style={{ lineHeight: "0" }} color="textSecondary" variant="button">
              {postComments.length}
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
              <Alert severity="info">Please log in to like and dislike posts</Alert>
            </CardContent>
          </Collapse>
        )}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent style={{ paddingTop: "0" }}>
            <Comments post={post} error={error} postComments={postComments} />
          </CardContent>
        </Collapse>
      </Card>
    </>
  );
};

export default Post;
