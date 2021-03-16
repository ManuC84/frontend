import React, { useState, useRef } from "react";
import { Link, TextField, Button } from "@material-ui/core";
import clsx from "clsx";
import { Card } from "@material-ui/core";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import moment from "moment";
import { useStyles } from "./styles";
import { addTag } from "../../../actions/posts";
import { useDispatch, useSelector } from "react-redux";

const Post = ({ post }) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const [tag, setTag] = useState("");
  const dispatch = useDispatch();
  const textRef = useRef(null);
  const { error } = useSelector((state) => state.posts);

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
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={post.title}
        subheader={moment(post.createdAt).fromNow()}
      />
      <Link href={post.url} target="_blank">
        <CardMedia className={classes.media} image={post.image} title="image" />
      </Link>

      <CardContent>
        <Typography variant="body1" color="textSecondary" component="p">
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
      <CardContent>
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
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
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
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent></CardContent>
      </Collapse>
    </Card>
  );
};

export default Post;
