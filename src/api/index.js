import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getPosts = () => API.get("/posts");

export const getSinglePost = (id) => API.get(`/posts/${id}`);

export const getInfiniteScroll = (skip) => API.get(`/posts?skip=${skip}`);

export const createPost = (payload) => API.post("/posts", payload);

export const getPostsByTags = (tags) => API.post("posts/tags", tags);

export const addTags = (id, tag) => API.post(`posts/tags/addTags/${id}`, tag);

export const getComments = (id) => API.get(`posts/${id}/comments`);

export const addComments = (id, payload) =>
  API.post(`posts/${id}/comments`, payload);

export const getCommentReplies = (postId, commentId) =>
  API.get(`posts/${postId}/comments/${commentId}`);

export const addCommentReply = (postId, commentId, payload) =>
  API.post(`posts/${postId}/comments/${commentId}`, payload);
