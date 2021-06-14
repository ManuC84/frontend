import axios from "axios";
import environment from "../../src/environment";

const API = axios.create({ baseURL: environment.baseUrl });

//Passing headers to backend for authorization
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile"))?.data?.token
    }`;
  }
  return req;
});

//-----------------------------------Posts-------------------------------------------------
export const getPosts = () => API.get("/posts");

export const getSinglePost = (id) => API.get(`/posts/${id}`);

export const getInfiniteScroll = (skip) => API.get(`/posts?skip=${skip}`);

export const createPost = (payload) => API.post("/posts", payload);

//Post likes
export const addPostLikes = (postId, userId) =>
  API.post(`posts/${postId}/likes`, userId);
//Post dislikes
export const addPostDislikes = (postId, userId) =>
  API.post(`posts/${postId}/dislikes`, userId);

//-------------------------------------Tags---------------------------------------------
export const getPostsByTags = (tags) => API.post("posts/tags", tags);

export const addTags = (id, tag) => API.post(`posts/tags/addTags/${id}`, tag);

//----------------------------------Comments--------------------------------------------------------

export const addComments = (id, payload) =>
  API.post(`posts/${id}/comments`, payload);

export const addCommentReply = (postId, commentId, payload) =>
  API.post(`posts/${postId}/comments/${commentId}`, payload);

//Comment likes
export const addCommentLikes = (postId, commentId, userId) =>
  API.post(`posts/${postId}/comments/${commentId}/likes`, userId);
//Comment Dislikes
export const addCommentDislikes = (postId, commentId, userId) =>
  API.post(`posts/${postId}/comments/${commentId}/dislikes`, userId);

//Comment Edit
export const editComment = (postId, commentId, commentText) =>
  API.put(`posts/${postId}/comments/${commentId}/edit`, commentText);

//Comment Delete
export const deleteComment = (postId, commentId) =>
  API.delete(`posts/${postId}/comments/${commentId}/delete`);

//Comment Reply likes
export const addCommentReplyLikes = (
  postId,
  commentId,
  commentReplyId,
  userId
) =>
  API.post(
    `posts/${postId}/comments/${commentId}/commentReplies/${commentReplyId}/likes`,
    userId
  );

//Comment Reply dislikes
export const addCommentReplyDislikes = (
  postId,
  commentId,
  commentReplyId,
  userId
) =>
  API.post(
    `posts/${postId}/comments/${commentId}/commentReplies/${commentReplyId}/dislikes`,
    userId
  );

//Comment Reply edit
export const editCommentReply = (
  postId,
  commentId,
  commentReplyId,
  commentReplyText
) =>
  API.put(
    `posts/${postId}/comments/${commentId}/commentReplies/${commentReplyId}/edit`,
    commentReplyText
  );

//Comment Reply Delete
export const deleteCommentReply = (postId, commentId, commentReplyId) =>
  API.delete(
    `posts/${postId}/comments/${commentId}/commentReplies/${commentReplyId}/delete`
  );

//------------------------------------Notifications---------------------------------------

export const fetchNotification = (postId, commentId, commentReplyId) =>
  API.post(
    `posts/${postId}/comments/${commentId}/commentReplies/${commentReplyId}/notifications`
  );

//---------------------------------Auth----------------------------------------------
export const signIn = (formData) => API.post("/users/signin", formData);
export const signUp = (formData) => API.post("/users/signup", formData);
