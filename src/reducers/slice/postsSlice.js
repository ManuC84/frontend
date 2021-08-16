import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { API } from "../../api/index";

//FETCH ALL POSTS
export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const { data } = await API.get("/posts");
  return data;
});

//INFINITE SCROLL
export const fetchInfiniteScroll = createAsyncThunk(
  "posts/fetchInfiniteScroll",
  async (skip) => {
    const { data } = await API.get(`/posts?skip=${skip}`);
    return data;
  }
);
//CREATE POST
export const createPost = createAsyncThunk(
  "posts/createPost",
  async (payload) => {
    const { data } = await API.post("/posts", payload);
    return data;
  }
);
//FECTH SINGLE POST
export const fetchSinglePost = createAsyncThunk(
  "posts/fetchSinglePost",
  async (id) => {
    const { data } = await API.get(`/posts/${id}`);
    return data;
  }
);
//LIKE POST
export const likePost = createAsyncThunk("posts/likePost", async (obj) => {
  const { postId, userId } = obj;
  const { data } = await API.post(`/posts/${postId}/likes`, { userId: userId });
  return data;
});
//DISLIKE POST
export const dislikePost = createAsyncThunk(
  "posts/dislikePost",
  async (obj) => {
    const { postId, userId } = obj;
    const { data } = await API.post(`/posts/${postId}/dislikes`, {
      userId: userId,
    });
    return data;
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    status: "idle",
    isLoading: false,
    error: false,
    loadMorePosts: true,
    isNotification: false,
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
    // fetchAll: (state, action) => {
    //   return {
    //     ...state,
    //     posts: action.payload.filter(
    //       (post) => post.image !== "/images/no-image.png"
    //     ),
    //     isLoading: false,
    //     isNotification: false,
    //   };
    // },
    fetchSinglePost: (state, action) => {
      // return {
      //   ...state,
      //   posts: action.payload,
      //   loadMorePosts: false,
      //   isLoading: false,
      //   isNotification: false,
      // };
    },
    fetchInfinite: (state, action) => {
      // return {
      //   ...state,
      //   posts: state.posts.concat(
      //     action.payload.filter((post) => post.image !== "/images/no-image.png")
      //   ),
      // };
    },
    // create: (state, action) => {
    //   return {
    //   //   ...state,
    //   //   posts: action.payload,
    //   //   loadMorePosts: false,
    //   //   error: false,
    //   // };
    // },
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
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
      };
    },
    fetchComments: (state, action) => {
      const posts = state.posts;
      const post = posts.find(
        (post) => post._id === action.payload[0].parentPostId
      );
      post.comments = action.payload;
      state.isLoading = false;
    },

    createComment: (state, action) => {
      const post = state.posts.find(
        (post) => post._id === action.payload.parentPostId
      );
      post.comments.push(action.payload);

      state.isLoading = false;
      state.isNotification = false;
    },
    fetchCommentReplies: (state, action) => {
      const posts = state.posts;
      const post = posts.find(
        (post) => post._id === action.payload[0].parentPostId
      );
      const comments = post.comments.find(
        (comment) => comment._id === action.payload[0].parentCommentId
      );
      comments.commentReplies = action.payload;
      state.isLoading = false;
    },

    createCommentReply: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isLoading: false,
        isNotification: false,
      };
    },

    addPostLike: (state, action) => {
      // return {
      //   ...state,
      //   posts: state.posts.map((post) =>
      //     post._id === action.payload._id ? action.payload : post
      //   ),
      //   isNotification: false,
      // };
    },
    addPostDislike: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isNotification: false,
      };
    },
    addCommentLike: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isNotification: false,
      };
    },
    addCommentDislike: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isNotification: false,
      };
    },
    addCommentReplyLike: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isNotification: false,
      };
    },
    addCommentReplyDislike: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isNotification: false,
      };
    },
    editComment: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isNotification: false,
      };
    },
    editCommentReply: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isNotification: false,
      };
    },
    deleteComment: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isNotification: false,
      };
    },
    deleteCommentReply: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isNotification: false,
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

      state.posts = action.payload;
      state.loadMorePosts = true;
    },
    [fetchPosts.rejected]: (state, action) => {
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

      state.posts = state.posts.concat(
        action.payload.filter((post) => post.image !== "/images/no-image.png")
      );
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
} = postsSlice.actions;

export default postsSlice.reducer;

export const selectAllPosts = (state) => state.posts;
