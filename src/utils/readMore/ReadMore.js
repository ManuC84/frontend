import React, { useState } from "react";
import { Typography, Button } from "@material-ui/core";

const ReadMore = ({ content, lines, variant, color }) => {
  const [readMore, setReadMore] = useState(false);
  return content.length <= lines ? (
    <Typography
      style={{ display: "inline" }}
      variant={variant}
      color={color}
      dangerouslySetInnerHTML={{ __html: content }}
    ></Typography>
  ) : readMore ? (
    <>
      <Typography
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ display: "inline" }}
        variant={variant}
        color={color}
      ></Typography>
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
      <Typography
        style={{ display: "inline" }}
        variant={variant}
        color={color}
        dangerouslySetInnerHTML={{
          __html: content.substring(0, lines) + "...",
        }}
      ></Typography>
      <Button
        style={{ display: "inline" }}
        size="small"
        onClick={() => setReadMore((prev) => !prev)}
      >
        See more
      </Button>
    </>
  );
};

export default ReadMore;
