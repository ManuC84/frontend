import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Link } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { hasError } from "../reducers/slice/postsSlice";
import { useSelector } from "react-redux";
import { setAuthAlert } from "../reducers/slice/authSlice";

export default function AlertDialog({ textContent, yesButton, noButton, authError, setAuthError }) {
  const { authAlert } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(setAuthAlert(false));
    dispatch(hasError(false));
  };

  return (
    <div>
      <Dialog
        open={authAlert || false}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Token authorization expired"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{textContent}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {noButton}
          </Button>
          <Link href="/auth">
            <Button onClick={handleClose} color="primary" autoFocus>
              {yesButton}
            </Button>
          </Link>
        </DialogActions>
      </Dialog>
    </div>
  );
}
