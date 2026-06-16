import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCommentsTC,
  fetchRepliesTC,
  fetchMoreCommentsTC,
  postCommentTC,
  postReplyTC,
} from "../../thunks/spec/video/commentsThunks";

const initialState = {
  comments: [],
  loading: false,
  posting: false,
  loadingReplies: {},
  loadingMore: false,
  nextPageToken: "",
  error: null,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    clearComments(state) {
      state.comments = [];
      state.error = null;
      state.loadingMore = false;
      state.nextPageToken = "";
    },
    addLocalComment(state, action) {
      state.comments.unshift(action.payload);
    },
    addLocalReply(state, action) {
      const { threadId, reply } = action.payload;
      const thread = state.comments.find((t) => t.id === threadId);
      if (thread) {
        if (!thread.replies) {
          thread.replies = { comments: [] };
        }
        thread.replies.comments.push(reply);
        thread.snippet.totalReplyCount = (thread.snippet.totalReplyCount || 0) + 1;
      }
    },
    toggleLikeComment(state, action) {
      const { threadId, commentId } = action.payload;
      const thread = state.comments.find((t) => t.id === threadId);
      if (thread) {
        let snippet = null;
        if (thread.snippet?.topLevelComment?.id === commentId) {
          snippet = thread.snippet.topLevelComment.snippet;
        } else if (thread.replies?.comments) {
          const reply = thread.replies.comments.find((c) => c.id === commentId);
          if (reply) {
            snippet = reply.snippet;
          }
        }

        if (snippet) {
          if (snippet.userLiked) {
            snippet.userLiked = false;
            snippet.likeCount = Math.max(0, (snippet.likeCount || 0) - 1);
          } else {
            snippet.userLiked = true;
            snippet.likeCount = (snippet.likeCount || 0) + 1;
            if (snippet.userDisliked) {
              snippet.userDisliked = false;
            }
          }
        }
      }
    },
    toggleDislikeComment(state, action) {
      const { threadId, commentId } = action.payload;
      const thread = state.comments.find((t) => t.id === threadId);
      if (thread) {
        let snippet = null;
        if (thread.snippet?.topLevelComment?.id === commentId) {
          snippet = thread.snippet.topLevelComment.snippet;
        } else if (thread.replies?.comments) {
          const reply = thread.replies.comments.find((c) => c.id === commentId);
          if (reply) {
            snippet = reply.snippet;
          }
        }

        if (snippet) {
          if (snippet.userDisliked) {
            snippet.userDisliked = false;
          } else {
            snippet.userDisliked = true;
            if (snippet.userLiked) {
              snippet.userLiked = false;
              snippet.likeCount = Math.max(0, (snippet.likeCount || 0) - 1);
            }
          }
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCommentsTC.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.nextPageToken = "";
      })
      .addCase(fetchCommentsTC.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload?.items || [];
        state.nextPageToken = action.payload?.nextPageToken || "";
      })
      .addCase(fetchCommentsTC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(postCommentTC.pending, (state) => {
        state.posting = true;
      })
      .addCase(postCommentTC.fulfilled, (state, action) => {
        state.posting = false;
        if (action.payload) {
          state.comments.unshift(action.payload);
        }
      })
      .addCase(postCommentTC.rejected, (state) => {
        state.posting = false;
      })
      .addCase(postReplyTC.pending, (state) => {
        state.posting = true;
      })
      .addCase(postReplyTC.fulfilled, (state, action) => {
        state.posting = false;
        if (action.payload) {
          const { parentId, reply } = action.payload;
          const thread = state.comments.find((t) => t.id === parentId);
          if (thread) {
            if (!thread.replies) {
              thread.replies = { comments: [] };
            }
            thread.replies.comments.push(reply);
            thread.snippet.totalReplyCount = (thread.snippet.totalReplyCount || 0) + 1;
          }
        }
      })
      .addCase(postReplyTC.rejected, (state) => {
        state.posting = false;
      })
      .addCase(fetchMoreCommentsTC.pending, (state) => {
        state.loadingMore = true;
        state.error = null;
      })
      .addCase(fetchMoreCommentsTC.fulfilled, (state, action) => {
        state.loadingMore = false;

        const incoming = action.payload?.items || [];
        const existingIds = new Set(state.comments.map((thread) => thread.id));
        const uniqueIncoming = incoming.filter((thread) => !existingIds.has(thread.id));

        state.comments.push(...uniqueIncoming);
        state.nextPageToken = action.payload?.nextPageToken || "";
      })
      .addCase(fetchMoreCommentsTC.rejected, (state, action) => {
        state.loadingMore = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(fetchRepliesTC.pending, (state, action) => {
        const threadId = action.meta.arg.threadId;
        state.loadingReplies[threadId] = true;
      })
      .addCase(fetchRepliesTC.fulfilled, (state, action) => {
        const { threadId, replies } = action.payload;
        state.loadingReplies[threadId] = false;
        const thread = state.comments.find((t) => t.id === threadId);
        if (thread) {
          thread.replies = { comments: replies };
          thread.snippet.totalReplyCount = replies.length;
        }
      })
      .addCase(fetchRepliesTC.rejected, (state, action) => {
        const threadId = action.meta.arg?.threadId;
        if (threadId) state.loadingReplies[threadId] = false;
      });
  },
});

export const {
  clearComments,
  addLocalComment,
  addLocalReply,
  toggleLikeComment,
  toggleDislikeComment,
} = commentsSlice.actions;
export { fetchRepliesTC };
export default commentsSlice.reducer;
