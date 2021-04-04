import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "@material-ui/core";
import { addComment } from "../../actions/comments";
import Alert from "@material-ui/lab/Alert";
import "./styles.css";

const TextEditor = ({ post, user }) => {
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addComment(post._id, { comment: body, creator: user }));
  };

  return !user[0] ? (
    <Alert severity="warning" style={{ margin: "10px 0" }}>
      You must be Logged in to comment
    </Alert>
  ) : (
    <form className="ckeditorForm" onSubmit={handleSubmit}>
      <CKEditor
        ref={inputRef}
        editor={ClassicEditor}
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
    </form>
  );
};

export default TextEditor;
