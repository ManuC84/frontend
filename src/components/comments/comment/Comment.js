import React, { useState, useEffect, useRef } from 'react';
import {
  Avatar,
  Grid,
  Paper,
  Typography,
  Grow,
  Collapse,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Fade,
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { ThumbUp, ThumbDown } from '@material-ui/icons';
import Pagination from '@material-ui/lab/Pagination';

import { useStyles } from './styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ReadMore from '../../../utils/readMore/ReadMore';
import clsx from 'clsx';
import TextEditor from '../../textEditor/TextEditor';
import { removeComment, getCommentReplies } from '../../../actions/comments';
import {
  likeComment,
  dislikeComment,
  deleteComment,
} from '../../../reducers/slice/commentsSlice';
import moment from 'moment';
import CommentReplies from '../commentReplies/CommentReplies';
import { useDispatch } from 'react-redux';
import { useGlobalContext } from '../../../context';
import { useSelector } from 'react-redux';
import { current } from '@reduxjs/toolkit';
import {
  fetchSinglePost,
  toggleIsNotification,
} from '../../../reducers/slice/postsSlice';
import {
  fetchCommentReplies,
  filterNotificationReply,
} from '../../../reducers/slice/commentRepliesSlice';
import { sortFunctionAsc, sortFunctionDesc } from '../../../utils/Sort';

const Comment = ({ comment, user, post, error }) => {
  const [expanded, setExpanded] = useState(false);
  const [showEditor, setShowEditor] = useState(false);
  const [page, setPage] = React.useState(1);
  const [lastPage, setLastPage] = useState(null);
  const [commentsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isNotification } = useSelector((state) => state.posts);
  const { commentReplies, showAllReplies } = useSelector(
    (state) => state.commentReplies,
  );

  //Fetch comment replies on post render from commentReplies db
  useEffect(() => {
    if (!isNotification)
      dispatch(
        fetchCommentReplies({ postId: post._id, commentId: comment._id }),
      );
  }, []);

  const commentCommentReplies = commentReplies.filter(
    (commentReply) => commentReply.parentCommentId === comment._id,
  );

  const scrollRef = useRef(null);

  //Expand commentReplies when showing notification content
  useEffect(() => {
    if (isNotification) setExpanded(true);
  }, [isNotification]);

  //Scroll to bottom when notification shows
  useEffect(() => {
    setTimeout(() => {
      if (isNotification && scrollRef.current) {
        scrollRef.current.scrollIntoView({
          behaviour: 'smooth',
          block: 'center',
          inline: 'center',
        });
      }
    }, 500);
  }, []);

  const userId =
    user[0] && (user[0]?.data?.result?.googleId || user[0]?.data?.result?._id);

  // Comment's drop down menu related
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleDelete = () => {
    let deleteAlert = window.confirm(
      'Are you sure you want to delete this comment?',
    );
    if (!deleteAlert) return;
    dispatch(deleteComment({ postId: post._id, commentId: comment._id }));
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Pagination related
  const handleChange = (event, value) => {
    setPage(value);
  };

  // Get current comments replies
  const indexOfLastComment = page * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentCommentReplies = commentCommentReplies
    .slice(indexOfFirstComment, indexOfLastComment)
    .sort(sortFunctionAsc);

  useEffect(() => {
    setPage(Math.ceil(commentCommentReplies.length / 5));
  }, [commentCommentReplies.length]);

  useEffect(() => {
    if (scrollRef.current && expanded) {
      scrollRef.current.scrollIntoView({
        behaviour: 'smooth',
        block: 'center',
        inline: 'center',
      });
    }
  }, [expanded]);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    if (!expanded) {
      setShowEditor(false);
      dispatch(
        fetchCommentReplies({ postId: post._id, commentId: comment._id }),
      );
    }
  };

  const handleLikeComment = () => {
    if (user[0])
      dispatch(
        likeComment({
          postId: post._id,
          commentId: comment._id,
          userId: userId,
        }),
      );
  };
  const handleDislikeComment = () => {
    if (user[0])
      dispatch(
        dislikeComment({
          postId: post._id,
          commentId: comment._id,
          userId: userId,
        }),
      );
  };

  return (
    <Grow in={true}>
      <Paper
        style={{
          padding: '20px 20px 0 20px',
          marginBottom: '10px',
          backgroundColor: '#f9fafb',
        }}
        elevation={2}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar
              title={comment.creator[0]?.name}
              alt="avatar"
              src={comment.creator[0]?.imageUrl}
            />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography
              variant="h6"
              style={{ margin: 0, textAlign: 'left', fontSize: '0.9rem' }}
            >
              {comment.creator[0]?.name}
            </Typography>
            <Typography
              style={{ textAlign: 'left', color: 'gray', fontSize: '0.8rem' }}
            >
              {moment(comment.createdAt).fromNow()}
            </Typography>
            {/* COMMENT BODY */}
            <Fade in={isEditing} timeout={1000}>
              {!isEditing ? (
                <ReadMore
                  lines={200}
                  content={comment.comment}
                  variant={'body2'}
                  color={'textPrimary'}
                />
              ) : (
                <div>
                  <TextEditor
                    post={post}
                    comment={comment}
                    user={user}
                    type={'commentEdition'}
                    setShowEditor={setShowEditor}
                    error={error}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    editText={comment.comment}
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

          {(user[0]?.data?.result?.googleId || user[0]?.data?.result?._id) ===
          comment?.creator[0]?._id ? (
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClick={handleClose}
              onClose={handleClose}
              getContentAnchorEl={null}
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* LIKE AND DISLIKE BUTTONS */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginLeft: '2.5rem',
            }}
          >
            <div onClick={handleLikeComment}>
              <IconButton
                aria-label="Like"
                disabled={!user[0]}
                color={comment.likes.includes(userId) ? 'primary' : 'default'}
              >
                <ThumbUp fontSize="small" />
              </IconButton>
            </div>
            {comment.likes.length - comment.dislikes.length}
            <div onClick={handleDislikeComment}>
              <IconButton
                aria-label="dislike"
                disabled={!user[0]}
                color={
                  comment.dislikes.includes(userId) ? 'secondary' : 'default'
                }
              >
                <ThumbDown fontSize="small" />
              </IconButton>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div>
              <Typography
                variant="button"
                color="textSecondary"
                className={classes.showReplies}
              >
                {!expanded ? 'Show Replies' : 'Hide Replies'}
              </Typography>
            </div>
            <div>
              <Typography
                color="textSecondary"
                variant="button"
                className={classes.replyNumber}
              >
                {commentCommentReplies.length}
              </Typography>
            </div>
            <div onClick={handleExpandClick}>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </div>
          </div>
        </div>
        {/* COMMENT REPLIES */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          {!showEditor && (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                style={{ margin: '10px 0' }}
                color="primary"
                variant="outlined"
                onClick={() => setShowEditor(true)}
              >
                Reply to comment
              </Button>
            </div>
          )}
          <Collapse in={showEditor} timeout="auto">
            <TextEditor
              post={post}
              comment={comment}
              user={user}
              type={'commentReplies'}
              setShowEditor={setShowEditor}
              error={error}
              setPage={setPage}
              lastPage={Math.ceil(commentCommentReplies.length / 5)}
              scrollRef={scrollRef}
            />
          </Collapse>
          {commentCommentReplies.length === 0 ? (
            <Paper>
              <Typography variant="body2" style={{ padding: '1rem' }}>
                This comment has no replies yet.
              </Typography>
            </Paper>
          ) : (
            currentCommentReplies.map((commentReply, idx, arr) => (
              <>
                <CommentReplies
                  key={commentReply._id}
                  post={post}
                  user={user}
                  comment={comment}
                  commentReply={commentReply}
                  error={error}
                  setPage={setPage}
                  isNotification={isNotification}
                />

                {idx === arr.length - 1 && (
                  <div className="dummyDiv" ref={scrollRef}></div>
                )}
              </>
            ))
          )}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginBottom: '16px',
            }}
          >
            <Pagination
              style={{ marginTop: '16px' }}
              page={page}
              onChange={handleChange}
              align="center"
              count={Math.ceil(commentCommentReplies.length / 5)}
              variant="outlined"
              shape="rounded"
            />
            {isNotification && showAllReplies && (
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginTop: 15 }}
                onClick={() => {
                  dispatch(
                    fetchCommentReplies({
                      postId: post._id,
                      commentId: comment._id,
                    }),
                  );
                  dispatch(toggleIsNotification(false));
                }}
              >
                Show all replies
              </Button>
            )}
          </div>
        </Collapse>
      </Paper>
    </Grow>
  );
};

export default Comment;
