import * as API from "../api/index";
import {
  create,
  fetchAll,
  fetchByTag,
  addTags,
} from "../reducers/slice/postsSlice";

export const submitSearchUrl = (url) => async (dispatch) => {
  try {
    const { data } = await API.createPost(url);

    dispatch(create(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchPosts = () => async (dispatch) => {
  try {
    const { data } = await API.getPosts();
    dispatch(fetchAll(data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchPostsByTags = (tags) => async (dispatch) => {
  try {
    const { data } = await API.getPostsByTags(tags);
    dispatch(fetchByTag(data));
  } catch (error) {
    console.log(error);
  }
};

export const addTag = (id, tag) => async (dispatch) => {
  try {
    const { data } = await API.addTags(id, tag);
    dispatch(addTags(data));
  } catch (error) {
    console.log(error);
  }
};
