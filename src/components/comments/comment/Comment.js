import React from "react";
import { Avatar, Grid, Paper, Typography, Grow } from "@material-ui/core";
import ReadMore from "../../../utils/readMore/ReadMore";
import renderHTML from "react-render-html";

import moment from "moment";

const Comment = ({ comment }) => {
  return (
    <Grow in={true}>
      <Paper
        style={{ padding: "20px 20px", marginBottom: "5px" }}
        elevation={2}
      >
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar
              alt="Remy Sharp"
              src={comment.creator[0]?.result?.imageUrl}
            />
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography
              variant="h6"
              style={{ margin: 0, textAlign: "left", fontSize: "0.9rem" }}
            >
              {comment.creator[0]?.result?.name}
            </Typography>
            <ReadMore
              lines={200}
              content={comment.comment}
              variant={"body2"}
              color={"textPrimary"}
            />

            {/* <Typography
                variant="body2"
                style={{ textAlign: "left", padding: "10px 0" }}
                dangerouslySetInnerHTML={{ __html: comment.comment }}
              ></Typography> */}

            <Typography
              style={{ textAlign: "left", color: "gray", fontSize: "0.8rem" }}
            >
              {moment(comment.createdAt).fromNow()}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
    </Grow>
  );
};

export default Comment;
