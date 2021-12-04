import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/index";

//FETCH ALL POSTS
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await API.get("/posts");
  return data;
});

//SORT POSTS
export const sortPosts = createAsyncThunk("posts/sortPosts", async (type) => {
  const { data } = await API.get(`/posts/?sort=${type}`);
  return data;
});

//INFINITE SCROLL
export const fetchInfiniteScroll = createAsyncThunk("posts/fetchInfiniteScroll", async (obj) => {
  const { skip, sort } = obj;
  const { data } = !sort
    ? await API.get(`/posts?skip=${skip}`)
    : await API.get(`/posts?skip=${skip}&sort=${sort}`);
  return data;
});
//CREATE POST
export const createPost = createAsyncThunk("posts/createPost", async (payload) => {
  const { data } = await API.post("/posts", payload);
  return data;
});
//FETCH SINGLE POST
export const fetchSinglePost = createAsyncThunk("posts/fetchSinglePost", async (id) => {
  const { data } = await API.get(`/posts/${id}`);
  return data;
});
//FETCH NOTIFICATION POST
export const fetchNotificationPost = createAsyncThunk("posts/fetchNotificationPost", async (id) => {
  const { data } = await API.get(`/posts/${id}`);
  return data;
});
//LIKE POST
export const likePost = createAsyncThunk("posts/likePost", async (obj) => {
  const { postId, userId } = obj;
  const { data } = await API.post(`/posts/${postId}/likes`, { userId: userId });
  return data;
});
//DISLIKE POST
export const dislikePost = createAsyncThunk("posts/dislikePost", async (obj) => {
  const { postId, userId } = obj;
  const { data } = await API.post(`/posts/${postId}/dislikes`, {
    userId: userId,
  });
  return data;
});

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    isLoading: false,
    error: false,
    loadMorePosts: true,
    isNotification: false,
    isTopComment: false,
    sort: "",
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    hasError: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    hasMore: (state, action) => {
      state.loadMorePosts = action.payload;
    },
    toggleIsNotification: (state, action) => {
      state.isNotification = action.payload;
    },
    toggleIsTopComment: (state, action) => {
      state.isTopComment = action.payload;
    },
    toggleError: (state, action) => {
      state.error = action.payload;
    },
    isSort: (state, action) => {
      state.sort = action.payload;
    },

    fetchByTag: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
        loadMorePosts: false,
      };
    },
    addTags: (state, action) => {
      return {
        ...state,
        error: false,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      };
    },

    showNotificationContent: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loadMorePosts: false,
        isNotification: true,
      };
    },
  },
  extraReducers: {
    //FETCH ALL POSTS
    [fetchPosts.pending]: (state) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = false;
      state.posts = action.payload;
      state.loadMorePosts = true;
      state.isNotification = false;
      state.isTopComment = false;
      state.sort = "";
    },
    [fetchPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //SORT  POSTS
    [sortPosts.pending]: (state) => {
      state.status = "loading";
    },
    [sortPosts.fulfilled]: (state, action) => {
      state.status = "succeeded";
      state.error = false;
      state.posts = action.payload;
      state.loadMorePosts = true;
      state.isNotification = false;
      state.isTopComment = false;
    },
    [sortPosts.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    //INFINITE SCROLL
    [fetchInfiniteScroll.fulfilled]: (state, action) => {
      if (!action.payload.length) {
        state.error = "You've reached the end";
        state.loadMorePosts = false;
      }
      state.status = "succeeded";

      state.posts = state.posts.concat(action.payload);
    },
    [fetchInfiniteScroll.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    //CREATE POST
    [createPost.pending]: (state) => {
      state.status = "loading";
    },
    [createPost.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.posts = action.payload;
      state.error = false;
      state.loadMorePosts = false;
    },
    [createPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },

    //FETCH SINGLE POST
    [fetchSinglePost.pending]: (state) => {
      state.status = "loading";
    },
    [fetchSinglePost.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.posts = action.payload;
      state.loadMorePosts = false;

      state.isNotification = false;
    },
    [fetchSinglePost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //FETCH NOTIFICATION POST
    [fetchNotificationPost.pending]: (state) => {
      state.status = "loading";
    },
    [fetchNotificationPost.fulfilled]: (state, action) => {
      state.status = "succeeded";

      state.posts = action.payload;
      state.loadMorePosts = false;
      state.isNotification = true;
    },
    [fetchNotificationPost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //LIKE POST
    [likePost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.isNotification = false;
    },
    [likePost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
    //DISLIKE POST
    [dislikePost.fulfilled]: (state, action) => {
      state.posts = state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );
      state.isNotification = false;
    },
    [dislikePost.rejected]: (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    },
  },
});

export const {
  create,
  fetchAll,
  fetchByTag,
  addTags,
  startLoading,
  hasError,
  fetchInfinite,
  hasMore,
  fetchComments,
  fetchCommentReplies,
  createComment,
  createCommentReply,
  addPostLike,
  addPostDislike,
  addCommentLike,
  addCommentDislike,
  addCommentReplyLike,
  addCommentReplyDislike,
  editComment,
  editCommentReply,
  deleteComment,
  deleteCommentReply,
  removeError,
  showNotificationContent,
  toggleIsNotification,
  toggleIsTopComment,
  isSort,
  toggleError,
} = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts;
