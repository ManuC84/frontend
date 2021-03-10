import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Paper, Typography, Button } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import SearchBar from "material-ui-search-bar";
import makeStyles from "./styles";
import { submitSearch, fetchPosts } from "../../reducers/slice/postsSlice";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [invalidUrlError, setInvalidUrlError] = useState(false);

  const dispatch = useDispatch();
  const classes = makeStyles();
  const urlRegex = new RegExp(
    /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i
  );
  const urlCheck = urlRegex.test(searchTerm);

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  useEffect(() => {
    if (invalidUrlError) {
      setTimeout(() => {
        setInvalidUrlError(false);
      }, 5000);
    }
  }, [invalidUrlError]);

  const handleSubmit = async () => {
    if (!urlCheck) {
      setInvalidUrlError(true);
      return;
    }
    dispatch(submitSearch({ url: searchTerm }));
    setSearchTerm("");
  };

  return (
    <Container maxWidth="lg" className={classes.navSpacer}>
      <Paper elevation={3} className={classes.paper}>
        <SearchBar
          value={searchTerm}
          onChange={(newValue) => setSearchTerm(newValue)}
          onRequestSearch={() => {}}
          className={classes.search}
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
            />
            <FormControlLabel
              value="start"
              control={<Radio color="primary" />}
              label="Tags"
              labelPlacement="start"
            />
          </RadioGroup>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Search
        </Button>
      </Paper>
      {invalidUrlError && (
        <Alert severity="error">Please enter a valid url</Alert>
      )}
    </Container>
  );
};

export default Search;
