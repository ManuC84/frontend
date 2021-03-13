import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:8000" });

export const getPosts = () => API.get("/posts");

export const createPost = (url) => API.post("/posts", url);

export const getPostsByTags = (tags) => API.post("posts/tags", tags);
