import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Paper,
  Typography,
  Button,
  ButtonGroup,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";

import SearchBar from "material-ui-search-bar";
import makeStyles from "./styles";
import {
  submitSearchUrl,
  fetchPosts,
  fetchPostsByTags,
} from "../../actions/posts";

const Search = () => {
  const [searchUrl, setSearchUrl] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [searchType, setSearchType] = useState("url");
  const [searchError, setSearchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const classes = makeStyles();
  const urlRegex = new RegExp(
    /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  );
  const urlCheck = urlRegex.test(searchUrl);

  // Handle search submit
  const handleSubmit = () => {
    if (!searchUrl && !searchTags) {
      setSearchError(true);
      setErrorMessage("Please enter a value");
      return;
    }

    if (searchUrl && !urlCheck && searchType === "url") {
      setSearchError(true);
      setErrorMessage("Please enter a valid url");
      return;
    }

    if (searchType === "url") dispatch(submitSearchUrl({ url: searchUrl }));

    if (searchType === "tags")
      dispatch(fetchPostsByTags({ tags: searchTags.split(",") }));
  };

  // Fetch all posts on load
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  // Set url invalid error if url is invalid
  useEffect(() => {
    if (searchError) {
      setTimeout(() => {
        setSearchError(false);
      }, 5000);
    }
  }, [searchError]);

  //Enter press for submit search
  useEffect(() => {
    const listener = (e) => {
      if (e.code === "Enter" || e.code === "NumpadEnter") {
        handleSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleSubmit]);

  const handleUrlButton = () => {
    setSearchType("url");
    setSearchTags("");
    setSearchError(false);
  };

  const handleTagsButton = () => {
    setSearchType("tags");
    setSearchUrl("");
    setSearchError(false);
  };

  return (
    <Container maxWidth="lg" className={classes.navSpacer}>
      <Paper elevation={3} className={classes.paper}>
        <SearchBar
          value={searchType === "url" ? searchUrl : searchTags}
          onChange={
            searchType === "url"
              ? (newValue) => setSearchUrl(newValue)
              : (newValue) => setSearchTags(newValue)
          }
          onCancelSearch={() => dispatch(fetchPosts())}
          className={classes.search}
          placeholder={
            searchType === "url" ? "Search url..." : "Search tags..."
          }
        />
        <FormControl component="fieldset">
          <RadioGroup
            row
            aria-label="position"
            name="position"
            defaultValue="top"
          >
            <FormControlLabel
              value="top"
              control={<Radio color="primary" />}
              label="Url"
              labelPlacement="start"
              onClick={handleUrlButton}
            />
            <FormControlLabel
              value="start"
              control={<Radio color="primary" />}
              label="Tags"
              labelPlacement="start"
              onClick={handleTagsButton}
            />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          onClick={handleSubmit}
        >
          Search
        </Button>
      </Paper>
      {searchError && <Alert severity="error">{errorMessage}</Alert>}
    </Container>
  );
};

export default Search;
