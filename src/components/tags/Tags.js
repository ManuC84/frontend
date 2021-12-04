import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Chip from "@material-ui/core/Chip";
import { Button, IconButton, Collapse, Grow, TextField, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useDispatch } from "react-redux";
import { fetchPostsByTags } from "../../actions/posts";
import CloseIcon from "@material-ui/icons/Close";
import { makeStyles } from "@material-ui/core/styles";
import { v4 as uuidv4 } from "uuid";

const useStyles = makeStyles((theme) => ({
  buttonText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: 10,
      fontWeight: "bold",
    },
  },
  addButton: {
    [theme.breakpoints.down("xs")]: {
      height: "100%",
    },
  },
}));

const Tags = ({
  openTagModal,
  handleCloseTagsModal,
  post,
  setTag,
  handleAddTags,
  textRef,
  addTagError,
}) => {
  const classes = useStyles();
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
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DialogTitle id="scroll-dialog-title">Tags</DialogTitle>
          <IconButton size="medium" onClick={handleCloseTagsModal} style={{ marginRight: 24 }}>
            <CloseIcon />
          </IconButton>
        </div>
        <DialogContent dividers={true}>
          {post.tags.length > 0 ? (
            <div>
              {post.tags.map((tag) => (
                <Grow key={uuidv4()} in={true}>
                  <Chip
                    label={tag}
                    style={{ margin: 5, cursor: "pointer" }}
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
        <DialogActions style={{ justifyContent: "center" }}>
          <TextField
            variant="outlined"
            size="small"
            type="text"
            onChange={(e) => setTag(e.target.value)}
            inputRef={textRef}
          />
          <Button
            className={classes.addButton}
            variant="outlined"
            size="medium"
            onClick={handleAddTags}
          >
            <Typography className={classes.buttonText}>Add Tag</Typography>
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
