import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getPosts = () => API.get("/posts");

export const getSinglePost = (id) => API.get(`/posts/post?id=${id}`);

export const getInfiniteScroll = (skip) => API.get(`/posts?skip=${skip}`);

export const createPost = (url) => API.post("/posts", url);

export const getPostsByTags = (tags) => API.post("posts/tags", tags);

export const addTags = (id, tag) => API.post(`posts/tags/addTags/${id}`, tag);
