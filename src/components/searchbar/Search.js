import React, { useState, useEffect, useCallback } from "react";
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
  Input,
  InputLabel,
  Collapse,
  Grow,
  Chip,
  Select,
  MenuItem,
  Switch,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import CloseIcon from "@material-ui/icons/Close";
import SearchBar from "material-ui-search-bar";
import makeStyles from "./styles";
import { submitSearchUrl, fetchPosts, fetchPostsByTags } from "../../actions/posts";
import { createPost, isLanguage, isSort, sortPosts } from "../../reducers/slice/postsSlice";
import { invalid } from "moment";
import { useSelector } from "react-redux";
import AddIcon from "@material-ui/icons/Add";
import ClearIcon from "@material-ui/icons/Clear";
import { languageList } from "../../utils/languageList";

const Search = () => {
  const [searchUrl, setSearchUrl] = useState("");
  const [searchTags, setSearchTags] = useState("");
  const [tagButtonContent, setTagButtonContent] = useState([]);
  const [searchType, setSearchType] = useState("url");
  const [searchError, setSearchError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const user = JSON.parse(localStorage.getItem("profile"));
  const [selectedValue, setSelectedValue] = useState(1);
  const [languageValue, setLanguageValue] = useState(0);

  const userData = user?.data?.result;

  const uniqueTags = new Set(tagButtonContent);

  const dispatch = useDispatch();
  const { posts, error, sort, language } = useSelector((state) => state.posts);
  const classes = makeStyles();
  const urlRegex = new RegExp(
    /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  );
  const urlCheck = urlRegex.test(searchUrl);

  //Reset sort dropdown to new if refresh
  useEffect(() => {
    if (!sort) setSelectedValue(1);
  }, [sort]);

  // Handle search submit
  const handleSubmit = useCallback(() => {
    if (!searchUrl && searchType === "url") {
      setSearchError(true);
      setErrorMessage("Please enter a value");
      return;
    }

    if (tagButtonContent.length === 0 && searchType === "tags") {
      setSearchError(true);
      setErrorMessage("Please enter a tag");
      return;
    }

    if (searchUrl && !urlCheck && searchType === "url") {
      setSearchError(true);
      setErrorMessage("Please enter a valid url");
      return;
    }

    if (searchType === "url") {
      dispatch(
        createPost({
          url: searchUrl,
          creator: { name: userData?.name, _id: userData?._id },
        })
      );
      setSearchError(false);
      setSearchUrl("");
    }

    if (searchType === "tags") {
      dispatch(fetchPostsByTags({ tags: Array.from(uniqueTags) }));
      setTagButtonContent([]);
      setSearchError(false);
    }
  }, [
    dispatch,
    searchType,
    searchUrl,
    tagButtonContent.length,
    uniqueTags,
    urlCheck,
    userData?._id,
    userData?.name,
  ]);

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

  // Enter press for submit search
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

  // Handle tag button creation
  const handleTags = () => {
    setTagButtonContent([...tagButtonContent, searchTags]);
    setSearchTags("");
  };

  // Handle tag key behavior
  useEffect(() => {
    if (searchType === "tags") {
      const listener = (e) => {
        if (e.code === "Comma" || e.code === "Tab") {
          if (tagButtonContent.length > 9) {
            setErrorMessage("Maximum of 10 tags allowed");
            setSearchError(true);
            return;
          }
          e.preventDefault();
          handleTags();
          setSearchTags("");
        }
      };
      document.addEventListener("keydown", listener);
      return () => {
        document.removeEventListener("keydown", listener);
      };
    }
  }, [handleTags]);

  // Handle tag delete
  const handleTagDelete = (index) => {
    setTagButtonContent(tagButtonContent.filter((tag, tagIdx) => tagIdx !== index));
  };

  // Handle radio buttons
  const handleUrlButton = () => {
    setSearchType("url");
    setSearchTags("");
    setTagButtonContent([]);
    setSearchError(false);
  };

  const handleTagsButton = () => {
    setSearchType("tags");
    setSearchUrl("");
    setSearchError(false);
  };

  return (
    <div className={classes.mainContainer}>
      <Paper elevation={3} className={classes.paper}>
        <div className={classes.searchBarContainer}>
          <SearchBar
            inputProps={
              searchType === "tags"
                ? {
                    maxLength: 32,
                  }
                : {}
            }
            value={searchType === "url" ? searchUrl : searchTags}
            onChange={
              searchType === "url"
                ? (newValue) => setSearchUrl(newValue)
                : (newValue) => setSearchTags(newValue)
            }
            onCancelSearch={() => (searchType === "url" ? dispatch(fetchPosts()) : handleTags())}
            closeIcon={
              searchType === "tags" ? (
                <AddIcon style={{ color: "grey" }} />
              ) : (
                <ClearIcon style={{ color: "grey" }} />
              )
            }
            className={classes.searchBar}
            placeholder={searchType === "url" ? "Search url..." : "Search tags..."}
          />

          {/* <FormControl component="fieldset">
            <RadioGroup row aria-label="position" name="position" defaultValue="top">
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
          </FormControl> */}
          <FormControlLabel
            control={
              <Switch
                checked={searchType === "tags" ? true : false}
                onChange={searchType === "url" ? handleTagsButton : handleUrlButton}
                name="checkedB"
                color="primary"
              />
            }
            label="Tags"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.searchButton}
          >
            Search
          </Button>
        </div>

        {tagButtonContent.length > 0 && (
          <div className={classes.tagsContainer}>
            {tagButtonContent.map((tag, index) => (
              <Grow in={true}>
                <Chip
                  label={tag}
                  onDelete={() => handleTagDelete(index)}
                  color="primary"
                  key={index}
                  className={classes.tagButton}
                />
              </Grow>
            ))}
          </div>
        )}
        <Collapse in={searchError}>
          <Alert severity="error">{errorMessage}</Alert>
        </Collapse>
      </Paper>
      <div className={classes.sortContainer}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            width: "150px",
            marginRight: "15px",
          }}
        >
          <FormControl size="small" variant="filled">
            <InputLabel htmlFor="sort-select">Sort</InputLabel>
            <Select
              style={{ width: 150, color: "white" }}
              value={selectedValue}
              label="category"
              onChange={(event) => setSelectedValue(event.target.value)}
              MenuProps={{
                anchorOrigin: {
                  vertical: "bottom",
                  horizontal: "center",
                },
                transformOrigin: {
                  vertical: "top",
                  horizontal: "center",
                },
                getContentAnchorEl: null,
              }}
            >
              <MenuItem
                onClick={() => {
                  dispatch(sortPosts({ type: "new", language }));
                  dispatch(isSort("new"));
                }}
                value={1}
              >
                New
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(sortPosts({ type: "hot", language }));
                  dispatch(isSort("hot"));
                }}
                value={2}
              >
                Hot
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(sortPosts({ type: "controversial", language }));
                  dispatch(isSort("controversial"));
                }}
                value={3}
              >
                Controversial
              </MenuItem>
              <MenuItem
                onClick={() => {
                  dispatch(sortPosts({ type: "most-liked", language }));
                  dispatch(isSort("most-liked"));
                }}
                value={4}
              >
                Most Liked
              </MenuItem>
            </Select>
          </FormControl>
        </div>
        <FormControl size="small" variant="filled">
          <InputLabel htmlFor="language-select">Language</InputLabel>
          <Select
            style={{ width: 150, color: "white" }}
            value={languageValue}
            label="language"
            onChange={(event) => setLanguageValue(event.target.value)}
            MenuProps={{
              anchorOrigin: {
                vertical: "bottom",
                horizontal: "center",
              },
              transformOrigin: {
                vertical: "top",
                horizontal: "center",
              },
              getContentAnchorEl: null,
            }}
            inputProps={{
              name: "language",
              id: "language-select",
            }}
          >
            <MenuItem
              onClick={() => {
                dispatch(isLanguage(""));
                dispatch(sortPosts({ type: "new", language: "" }));
              }}
              value={0}
            >
              None
            </MenuItem>
            {languageList.map((lang, i) => (
              <MenuItem
                onClick={() => {
                  dispatch(sortPosts({ type: sort, language: lang.code }));
                  dispatch(isLanguage(lang.code));
                }}
                key={lang.flag}
                value={i + 1}
              >
                <img style={{ height: 12, marginRight: 5 }} src={lang.flag} /> {lang.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default Search;
