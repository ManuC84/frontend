import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
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
    fetchAll: (state, action) => {
      return {
        ...state,
        posts: action.payload.filter(
          (post) => post.image !== "/images/no-image.png"
        ),
        isLoading: false,
        isNotification: false,
      };
    },
    fetchSinglePost: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loadMorePosts: false,
        isLoading: false,
        isNotification: false,
      };
    },
    fetchInfinite: (state, action) => {
      return {
        ...state,
        posts: state.posts.concat(
          action.payload.filter((post) => post.image !== "/images/no-image.png")
        ),
      };
    },
    create: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loadMorePosts: false,
        error: false,
      };
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
    fetchCommentReplies: (state, action) => {
      const posts = state.posts;
      const post = posts.find(
        (post) => post._id === action.payload[0].parentPostId
      );
      const comments = comments.find(
        (comment) => comment._id === action.payload[0].parentCommentId
      );
      comments.commentReplies = action.payload;
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
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        ),
        isNotification: false,
      };
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
  fetchSinglePost,
  fetchComments,
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
