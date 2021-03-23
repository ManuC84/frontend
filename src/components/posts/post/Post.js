import React, { useState, useRef } from "react";
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
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import { useStyles } from "./styles";
import { addTag } from "../../../actions/posts";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ post }) => {
  const [expanded, setExpanded] = useState(false);
  const { error } = useSelector((state) => state.posts);
  const [tag, setTag] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const textRef = useRef(null);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleAddTags = (e) => {
    e.preventDefault();
    dispatch(addTag(post._id, { tag: tag }));
    setTag("");
    textRef.current.value = "";
  };

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            alt="avatar"
            title="avatar"
          >
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Link href={`http://localhost:3000/posts/post/?id=${post._id}`}>
            {post.title}
          </Link>
        }
        subheader={moment(post.createdAt).fromNow()}
      />
      <Link href={post.url} target="_blank">
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
        <Typography variant="body1" color="textPrimary" component="p">
          {post.description}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography>Tags</Typography>
        {!post.tags.length ? (
          <Typography variant="body2" color="textSecondary" component="p">
            This post contains no tags, add some!
          </Typography>
        ) : (
          <Typography
            style={{ marginBottom: "5px" }}
            variant="body2"
            color="textSecondary"
            component="p"
          >
            {post.tags.map((tag) => "#" + tag + ", ")}
          </Typography>
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
        <Collapse in={error}>
          {error && <Alert severity="error">{error.message}</Alert>}
        </Collapse>
      </CardContent>

      <CardActions
        style={{ display: "flex", justifyContent: "space-between" }}
        disableSpacing
      >
        <div>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
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
            Show Comments
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
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
