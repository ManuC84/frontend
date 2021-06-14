import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "@material-ui/core";
import {
  addComment,
  addCommentReply,
  updateComment,
  updateCommentReply,
} from "../../actions/comments";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import "./styles.css";

const TextEditor = ({
  post,
  user,
  type,
  comment,
  commentReply,
  setShowEditor,
  props,
  error,
  isEditing,
  setIsEditing,
  editText,
  setPage,
  lastPage,
}) => {
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [editorValue, setEditorValue] = useState(null);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const history = useHistory();

  const handleShowEditor = () => setShowEditor(false);

  console.log(lastPage);

  const handleCloseEdit = () => {
    if (body !== editText) {
      let editAlert = window.confirm(
        "Are you sure you want to discard your message?"
      );
      if (editAlert) {
        setIsEditing(false);
      }
      return;
    }
    setIsEditing(false);
  };

  //SHOW TEXT TO EDIT
  useEffect(() => {
    if (editText && editorValue) {
      editorValue.data.set(String(editText));
    }
  }, [isEditing, editorValue]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!body) {
      setErrorMessage("Please enter a value");
      return;
    }

    if (type === "comments") {
      dispatch(
        addComment(post._id, { comment: body, creator: user[0]?.data?.result })
      );
    }

    if (type === "commentReplies") {
      await dispatch(
        addCommentReply(post._id, comment._id, {
          commentReply: body,
          creator: user[0]?.data?.result,
        })
      );
      setPage(lastPage);
      window.scrollTo({
        behavior: "smooth",
        top: 300,
      });
    }

    if (type === "commentEdition") {
      dispatch(updateComment(post._id, comment._id, { commentText: body }));
      setIsEditing(false);
    }

    if (type === "commentReplyEdition") {
      dispatch(
        updateCommentReply(post._id, comment._id, commentReply._id, {
          commentReplyText: body,
        })
      );
      setIsEditing(false);
    }

    setErrorMessage(null);
    if (error.authError) return;
    editorValue.data.set("");
  };

  return !user[0] ? (
    <Alert severity="warning" style={{ margin: "10px 0" }}>
      You must be Logged in to comment
    </Alert>
  ) : (
    <div {...props}>
      <form className="ckeditorForm" onSubmit={handleSubmit}>
        <CKEditor
          ref={inputRef}
          editor={ClassicEditor}
          onReady={(editor) => setEditorValue(editor)}
          onChange={(event, editor) => {
            const data = editor.getData();
            setBody(data);
          }}
        />
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        <Button
          variant="contained"
          size="small"
          color="primary"
          type="submit"
          style={{ marginTop: "5px" }}
        >
          Submit
        </Button>

        <Button
          variant="contained"
          size="small"
          color="secondary"
          style={{ margin: "5px 0 0 5px" }}
          onClick={!isEditing ? handleShowEditor : handleCloseEdit}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default TextEditor;
