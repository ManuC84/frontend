import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";

const ReadMore = ({ content, lines, variant, color }) => {
  const [readMore, setReadMore] = useState(false);
  return content.length <= lines ? (
    <Typography style={{ display: "inline" }} variant={variant} color={color}>
      {content}
    </Typography>
  ) : readMore ? (
    <>
      <Typography style={{ display: "inline" }} variant={variant} color={color}>
        {content}
      </Typography>
      <Button
        style={{ display: "inline" }}
        size="small"
        onClick={() => setReadMore((prev) => !prev)}
      >
        See less
      </Button>
    </>
  ) : (
    <>
      <Typography style={{ display: "inline" }} variant={variant} color={color}>
        {content.substring(0, lines)}
      </Typography>
      <Button
        style={{ display: "inline" }}
        size="small"
        onClick={() => setReadMore((prev) => !prev)}
      >
        ...See more
      </Button>
    </>
  );
};

export default ReadMore;
