import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../../../api/instances/instance";
import { youtubePrivateInstance } from "../../../../api/instances/youtubePrivateInstance";

export const fetchCommentsTC = createAsyncThunk(
  "comments/fetchComments",
  async (videoId, { rejectWithValue }) => {
    try {
      const res = await instance.get("/commentThreads", {
        params: {
          part: "snippet,replies",
          videoId: videoId,
          maxResults: 20,
          textFormat: "plainText",
        },
      });
      return res.data;
    } catch (error) {
      console.error("fetchCommentsTC error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchRepliesTC = createAsyncThunk(
  "comments/fetchReplies",
  async ({ threadId }, { rejectWithValue }) => {
    try {
      const res = await instance.get("/comments", {
        params: {
          part: "snippet",
          parentId: threadId,
          maxResults: 100,
          textFormat: "plainText",
        },
      });
      return { threadId, replies: res.data.items || [] };
    } catch (error) {
      console.error("fetchRepliesTC error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const postCommentTC = createAsyncThunk(
  "comments/postComment",
  async ({ videoId, text }, { rejectWithValue }) => {
    try {
      const res = await youtubePrivateInstance.post(
        "/commentThreads",
        {
          snippet: {
            videoId: videoId,
            topLevelComment: {
              snippet: {
                textOriginal: text,
              },
            },
          },
        },
        {
          params: {
            part: "snippet",
          },
          skipAuthReload: true,
        }
      );
      return res.data; 
    } catch (error) {
      console.error("postCommentTC error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const postReplyTC = createAsyncThunk(
  "comments/postReply",
  async ({ parentId, text }, { rejectWithValue }) => {
    try {
      const res = await youtubePrivateInstance.post(
        "/comments",
        {
          snippet: {
            parentId: parentId,
            textOriginal: text,
          },
        },
        {
          params: {
            part: "snippet",
          },
          skipAuthReload: true,
        }
      );
      return { parentId, reply: res.data };
    } catch (error) {
      console.error("postReplyTC error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const fetchMoreCommentsTC = createAsyncThunk(
  "comments/fetchMoreComments",
  async ({ videoId, pageToken }, { rejectWithValue }) => {
    try {
      const res = await instance.get("/commentThreads", {
        params: {
          part: "snippet,replies",
          videoId: videoId,
          maxResults: 20,
          pageToken,
          textFormat: "plainText",
        },
      });
      return res.data;
    } catch (error) {
      console.error("fetchMoreCommentsTC error:", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

