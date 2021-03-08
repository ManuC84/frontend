import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Container, Paper, Typography, Button } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import SearchBar from "material-ui-search-bar";
import makeStyles from "./styles";
import { submitSearch, fetchPosts } from "../../reducers/slice/postsSlice";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const classes = makeStyles();

  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleSubmit = async () => {
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
    </Container>
  );
};

export default Search;
