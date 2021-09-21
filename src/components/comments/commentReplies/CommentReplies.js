import React, { useState, useRef, useEffect } from 'react';
import {
  Avatar,
  Grid,
  Typography,
  IconButton,
  CardContent,
  Divider,
  Grow,
  CircularProgress,
  Menu,
  MenuItem,
  Fade,
} from '@material-ui/core';
import makeStyles from './styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import ReadMore from '../../../utils/readMore/ReadMore';
import moment from 'moment';
import { useSelector, useDispatch } from 'react-redux';
import { removeCommentReply } from '../../../actions/comments';
import TextEditor from '../../textEditor/TextEditor';
import {
  deleteCommentReply,
  dislikeCommentReply,
  likeCommentReply,
} from '../../../reducers/slice/commentRepliesSlice';

const CommentReplies = ({
  post,
  comment,
  user,
  commentReply,
  error,
  isNotification,
}) => {
  const { isLoading } = useSelector((state) => state.posts);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const dispatch = useDispatch();
  const classes = makeStyles();

  const userId =
    user[0] && (user[0]?.data?.result?.googleId || user[0]?.data?.result?._id);

  const handleLikeCommentReply = () => {
    if (user[0])
      dispatch(
        likeCommentReply({
          postId: post._id,
          commentId: comment._id,
          commentReplyId: commentReply._id,
          userId: userId,
        }),
      );
  };
  const handleDislikeCommentReply = () => {
    if (user[0])
      dispatch(
        dislikeCommentReply({
          postId: post._id,
          commentId: comment._id,
          commentReplyId: commentReply._id,
          userId: userId,
        }),
      );
  };

  const handleDelete = () => {
    let deleteAlert = window.confirm(
      'Are you sure you want to delete this comment?',
    );
    if (!deleteAlert) return;
    dispatch(
      deleteCommentReply({
        postId: post._id,
        commentId: comment._id,
        commentReplyId: commentReply._id,
      }),
    );
  };

  // Comment's drop down menu related
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  return isLoading ? (
    <CircularProgress />
  ) : (
    <Grow in={true}>
      <div className={isNotification && classes.notificationFadeOut}>
        <Divider variant="middle" />
        <CardContent className={classes.commentReply}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <SubdirectoryArrowRightIcon color="disabled" />
            </Grid>
            <Grid item>
              <Avatar
                title={commentReply.creator[0]?.name}
                alt="avatar"
                src={commentReply.creator[0]?.imageUrl}
              />
            </Grid>
            <Grid item xs zeroMinWidth>
              <Typography
                variant="h6"
                style={{ margin: 0, textAlign: 'left', fontSize: '0.9rem' }}
              >
                {commentReply.creator[0]?.name}
              </Typography>
              <Typography
                style={{
                  textAlign: 'left',
                  color: 'gray',
                  fontSize: '0.8rem',
                }}
              >
                {moment(commentReply.createdAt).fromNow()}
              </Typography>
              {/* COMMENT REPLY BODY */}
              <Fade in={isEditing} timeout={1000}>
                {!isEditing ? (
                  <ReadMore
                    lines={200}
                    content={commentReply.commentReply}
                    variant={'body2'}
                    color={'textPrimary'}
                  />
                ) : (
                  <div>
                    <TextEditor
                      post={post}
                      comment={comment}
                      commentReply={commentReply}
                      user={user}
                      type={'commentReplyEdition'}
                      setShowEditor={setShowEditor}
                      error={error}
                      isEditing={isEditing}
                      setIsEditing={setIsEditing}
                      editText={commentReply.commentReply}
                    />
                  </div>
                )}
              </Fade>
            </Grid>
            <Grid>
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
            </Grid>
            {(user[0]?.data?.result?._id || user[0]?.data?.result?.googleId) ===
            commentReply?.creator[0]?._id ? (
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClick={handleClose}
                onClose={handleClose}
                getContentAnchorEl={null}
                disableScrollLock={true}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <MenuItem onClick={handleEdit}>Edit</MenuItem>
                <MenuItem onClick={handleDelete}>Delete</MenuItem>
                <MenuItem onClick={handleClose}>Report</MenuItem>
              </Menu>
            ) : (
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                getContentAnchorEl={null}
                disableScrollLock={true}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <MenuItem onClick={handleClose}>Report</MenuItem>
              </Menu>
            )}
          </Grid>
          {/* COMMENT REPLIES LIKES AND DISLIKES */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '2.5rem',
              }}
            >
              <div onClick={handleLikeCommentReply}>
                <IconButton
                  aria-label="Like"
                  disabled={!user[0]}
                  color={
                    commentReply.likes.includes(userId) ? 'primary' : 'default'
                  }
                >
                  <ThumbUp fontSize="small" />
                </IconButton>
              </div>
              {commentReply.likes.length - commentReply.dislikes.length}
              <div onClick={handleDislikeCommentReply}>
                <IconButton
                  aria-label="dislike"
                  disabled={!user[0]}
                  color={
                    commentReply.dislikes.includes(userId)
                      ? 'secondary'
                      : 'default'
                  }
                >
                  <ThumbDown fontSize="small" />
                </IconButton>
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Grow>
  );
};

export default CommentReplies;
