import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "@material-ui/core";
import { addComment, addCommentReply } from "../../actions/comments";
import Alert from "@material-ui/lab/Alert";
import "./styles.css";

const TextEditor = ({ post, user, type, comment, setShowEditor, props }) => {
  const [body, setBody] = useState("");
  const [editorValue, setEditorValue] = useState(null);
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();

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
