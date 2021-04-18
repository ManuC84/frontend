import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "@material-ui/core";
import { addComment, addCommentReply } from "../../actions/comments";
import { useHistory } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import "./styles.css";

const TextEditor = ({
  post,
  user,
  type,
  comment,
  setShowEditor,
  props,
  error,
}) => {
  const [body, setBody] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [editorValue, setEditorValue] = useState(null);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!body) {
      setErrorMessage("Please enter a value");
      return;
    }

    if (type === "comments") {
      dispatch(addComment(post._id, { comment: body, creator: user }));
    }

    if (type === "commentReplies") {
      dispatch(
        addCommentReply(post._id, comment._id, {
          commentReply: body,
          creator: user,
        })
      );
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
          onClick={() => setShowEditor(false)}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default TextEditor;
