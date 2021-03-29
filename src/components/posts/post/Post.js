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

const Post = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const { error, posts } = useSelector((state) => state.posts);
  const [tag, setTag] = useState("");
  const [addTagError, setAddTagError] = useState({ error: "", bool: false });

  const textRef = useRef(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            alt="avatar"
            title={
              post?.creator[0]
                ? `${post.creator[0]?.givenName}, ${post.creator[0]?.familyName} `
                : "Annonymous"
            }
            // src={post.creator[0]?.imageUrl}
            src={post.icon}
          />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link href={post.url} target="_blank" title="Go to source">
            <Typography style={{ fontSize: "1rem" }} variant="body1">
              {post.provider}
            </Typography>
          </Link>
        }
        subheader={moment(post.createdAt).fromNow()}
      />
      <Link
        href={`http://localhost:3000/posts/post/?id=${post._id}`}
        style={{ textDecorations: "none", color: "inherit" }}
      >
        {post.url.includes("youtube") ? (
          <ReactPlayer
            url={post.url}
            width="100%"
            height="500px"
            config={{ youtube: { playerVars: { enablejsapi: 1 } } }}
          />
        ) : (
          <CardMedia
            className={classes.media}
            image={post.image}
            title="image"
          />
        )}
      </Link>
      <CardContent>
        <Typography variant="h6">{post.title}</Typography>
        <ReadMore
          lines={150}
          content={post.description}
          variant={"body2"}
          color={"textPrimary"}
        />
      </CardContent>
      <CardContent>
        <Typography>Tags</Typography>
        {!post.tags.length ? (
          <Typography variant="body2" color="textSecondary" component="p">
            This post contains no tags, add some!
          </Typography>
        ) : (
          <ReadMore
            lines={80}
            content={post.tags.map((tag) => "#" + tag + ", ").join("")}
            variant={"body2"}
            color={"textSecondary"}
          />
        )}
      </CardContent>
      <CardContent className={classes.addTagContainer}>
        <form onSubmit={handleAddTags}>
          <TextField
            label="Tag"
            size="small"
            required
            onChange={(e) => setTag(e.target.value)}
            inputRef={textRef}
            className={classes.addTagInput}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.addTagButton}
            type="submit"
          >
            Add tag!
          </Button>
        </form>
        <Collapse in={addTagError.bool}>
          {addTagError.bool && post._id === addTagError.postsId ? (
            <Alert
              severity="error"
              onClick={() => setAddTagError({ bool: false })}
            >
              {addTagError.error}
            </Alert>
          ) : null}
        </Collapse>
      </CardContent>

      <CardActions
        style={{ display: "flex", justifyContent: "space-between" }}
        disableSpacing
      >
        <div>
          <IconButton aria-label="Like">
            <ThumbUp />
          </IconButton>
          <IconButton aria-label="dislike">
            <ThumbDown />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="button"
            color="textSecondary"
            style={{ height: "20px" }}
          >
            {!expanded ? "Show Comments" : "Hide Comments"}
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent style={{ paddingTop: "0" }}>
          <Comments />
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
