import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { Button } from "@material-ui/core";
import "./styles.css";

const TextEditor = ({ onSubmit }) => {
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ body });
  };

  return (
    <form className="ckeditorForm" onSubmit={handleSubmit}>
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => {
          const data = editor.getData();
          setBody(data);
        }}
      />
      <Button
        variant="contained"
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
