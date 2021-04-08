import { createSlice, current } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    isLoading: false,
    error: false,
    loadMorePosts: true,
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
        posts: action.payload,
        isLoading: false,
      };
    },
    fetchSinglePost: (state, action) => {
      return {
        ...state,
        posts: action.payload,
        loadMorePosts: false,
        isLoading: false,
      };
    },
    fetchInfinite: (state, action) => {
      return {
        ...state,
        posts: state.posts.concat(action.payload),
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
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload[0].parentPostId
            ? { ...post, comments: action.payload }
            : post
        ),
        isLoading: false,
      };
    },
    createComment: (state, action) => {
      return {
        ...state,
        posts: state.posts.map((post) =>
          post._id === action.payload.parentPostId
            ? { ...post, comments: [action.payload, ...post.comments] }
            : post
        ),
        isLoading: false,
      };
    },
    fetchCommentReplies: (state, action) => {
      state.posts.map((post) => {
        if (post._id === action.payload[0].parentPostId) {
          post.comments.map((comment) => {
            if (comment._id === action.payload[0].parentCommentId) {
              comment.commentReplies = action.payload;
              state.isLoading = false;
            }
          });
        }
      });
    },
    createCommentReply: (state, action) => {
      state.posts.map((post) => {
        if (post._id === action.payload.parentPostId) {
          post.comments.map((comment) => {
            if (comment._id === action.payload.parentCommentId) {
              comment.commentReplies.push(action.payload);
            }
          });
        }
      });
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
  createComment,
  fetchComments,
  createCommentReply,
  fetchCommentReplies,
} = postsSlice.actions;
export default postsSlice.reducer;
