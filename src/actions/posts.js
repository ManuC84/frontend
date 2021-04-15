import * as API from "../api/index";
import {
  create,
  fetchAll,
  fetchByTag,
  addTags,
  startLoading,
  hasError,
  fetchInfinite,
  hasMore,
  fetchSinglePost,
  addPostLike,
} from "../reducers/slice/postsSlice";

export const submitSearchUrl = (payload) => async (dispatch) => {
  try {
    const { data } = await API.createPost(payload);

    dispatch(create(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};

export const fetchPosts = () => async (dispatch) => {
  dispatch(hasError(false));
  dispatch(hasMore(true));
  dispatch(startLoading());
  try {
    const { data } = await API.getPosts();
    dispatch(fetchAll(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};

export const getSinglePost = (id) => async (dispatch) => {
  dispatch(startLoading);
  try {
    const { data } = await API.getSinglePost(id);
    dispatch(fetchSinglePost(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};

export const infiniteFetch = (skip) => async (dispatch) => {
  try {
    const { data } = await API.getInfiniteScroll(skip);
    if (!data.length) {
      dispatch(hasError("You've reached the end"));
      dispatch(hasMore(false));
    }
    dispatch(fetchInfinite(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};

export const fetchPostsByTags = (tags) => async (dispatch) => {
  dispatch(hasError(false));
  dispatch(startLoading());
  try {
    const { data } = await API.getPostsByTags(tags);
    dispatch(fetchByTag(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};

export const addTag = (id, tag) => async (dispatch) => {
  try {
    const { data } = await API.addTags(id, tag);
    dispatch(addTags(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};

export const likePost = (postId, userId) => async (dispatch) => {
  try {
    const { data } = await API.addPostLikes(postId, userId);
    dispatch(addPostLike(data));
  } catch (error) {
    dispatch(hasError(error.response.data));
  }
};
