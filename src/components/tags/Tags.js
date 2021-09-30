import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Chip from '@material-ui/core/Chip';
import { Button, Collapse, Grow, TextField } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useDispatch } from 'react-redux';
import { fetchPostsByTags } from '../../actions/posts';
import CloseIcon from '@material-ui/icons/Close';

const Tags = ({
  openTagModal,
  handleCloseTagsModal,
  post,
  setTag,
  handleAddTags,
  textRef,
  addTagError,
}) => {
  const descriptionElementRef = React.useRef(null);
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (openTagModal) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [openTagModal]);

  return (
    <div>
      <Dialog
        open={openTagModal}
        onClose={handleCloseTagsModal}
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <DialogTitle id="scroll-dialog-title">Tags</DialogTitle>
          <CloseIcon
            onClick={handleCloseTagsModal}
            style={{ padding: '16px 24px', cursor: 'pointer' }}
          />
        </div>
        <DialogContent dividers={true}>
          {post.tags.length > 0 ? (
            <div>
              {post.tags.map((tag, idx) => (
                <Grow in={true}>
                  <Chip
                    label={tag}
                    key={idx}
                    style={{ margin: 5, cursor: 'pointer' }}
                    color="primary"
                    onClick={(e) => {
                      dispatch(fetchPostsByTags({ tags: [tag] }));
                      handleCloseTagsModal();
                    }}
                  />
                </Grow>
              ))}
            </div>
          ) : (
            <Alert severity="info">This post has no tags yet, add some!</Alert>
          )}
        </DialogContent>
        <DialogActions style={{ justifyContent: 'center' }}>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            onChange={(e) => setTag(e.target.value)}
            inputRef={textRef}
          />
          <Button variant="outlined" onClick={handleAddTags}>
            Add Tag
          </Button>
        </DialogActions>

        <Collapse in={addTagError.bool}>
          <Alert severity="error">{addTagError.error}</Alert>
        </Collapse>
      </Dialog>
    </div>
  );
};

export default Tags;
