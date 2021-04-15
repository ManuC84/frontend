import React from "react";

const Tags = () => {
  return (
    <div>
      {/* TAGS PENDING TO FIT THEM SOMEWHERE */}
      {/* <CardContent style={{ padding: "0 16px" }}>
        <Typography>Tags</Typography>
        {!post.tags.length ? (
          <Typography variant="body2" color="textSecondary" component="p">
            This post contains no tags, add some!
          </Typography>
        ) : (
          <ReadMore
            lines={80}
            content={post.tags.map((tag) => "#" + tag + ", ").join("")}
            variant={"body2"}
            color={"textSecondary"}
          />
        )}
      </CardContent>
      <CardContent className={classes.addTagContainer}>
        <form onSubmit={handleAddTags}>
          <TextField
            label="Tag"
            size="small"
            required
            onChange={(e) => setTag(e.target.value)}
            inputRef={textRef}
            className={classes.addTagInput}
          />
          <Button
            variant="contained"
            color="primary"
            size="small"
            className={classes.addTagButton}
            type="submit"
          >
            Add tag!
          </Button>
        </form>
        <Collapse in={addTagError.bool}>
          {addTagError.bool && post._id === addTagError.postsId ? (
            <Alert
              severity="error"
              onClick={() => setAddTagError({ bool: false })}
            >
              {addTagError.error}
            </Alert>
          ) : null}
        </Collapse>
      </CardContent> */}
    </div>
  );
};

export default Tags;
