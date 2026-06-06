import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  enrichSearchItems,
  getChannelById,
  getPlaylistItems,
  itemsToVideos,
  PLAYLIST_PAGE_SIZE,
  searchChannelVideos,
} from "../../api/channels";
import { getYouTubeApiErrorMessage } from "../../lib/youtubeApiError";

const loadPlaylistPage = async ({ uploadsPlaylistId, pageToken = "" }) => {
  const res = await getPlaylistItems({
    playlistId: uploadsPlaylistId,
    pageToken,
    maxResults: PLAYLIST_PAGE_SIZE,
  });

  const items = res.data?.items ?? [];
  let videos = itemsToVideos(items);

  if (items.length > 0) {
    try {
      const enriched = await enrichSearchItems(items);
      if (enriched.length > 0) videos = enriched;
    } catch {
      /* без просмотров, но видео показываем */
    }
  }

  return {
    videos,
    nextPageToken: res.data?.nextPageToken ?? "",
  };
};

export const fetchChannelVideosTC = createAsyncThunk(
  "channel/fetchVideos",
  async ({ uploadsPlaylistId, pageToken = "" }, { rejectWithValue }) => {
    if (!uploadsPlaylistId) {
      return { videos: [], nextPageToken: "" };
    }

    try {
      return await loadPlaylistPage({ uploadsPlaylistId, pageToken });
    } catch (error) {
      const message = getYouTubeApiErrorMessage(error, "Ошибка загрузки видео");
      return rejectWithValue(message || "Ошибка загрузки видео");
    }
  },
  {
    condition: (_, { getState }) => !getState().channelSlice.loading.videos,
  },
);

export const searchInChannelTC = createAsyncThunk(
  "channel/search",
  async ({ channelId, query, pageToken = "" }, { rejectWithValue }) => {
    try {
      const trimmed = query.trim();
      if (!trimmed) {
        return { videos: [], nextPageToken: "", query: "" };
      }

      const res = await searchChannelVideos({
        channelId,
        q: trimmed,
        pageToken,
        order: "relevance",
        maxResults: PLAYLIST_PAGE_SIZE,
      });

      const items = res.data?.items ?? [];
      let videos = itemsToVideos(items);

      if (items.length > 0) {
        try {
          const enriched = await enrichSearchItems(items);
          if (enriched.length > 0) videos = enriched;
        } catch {
          /* без просмотров */
        }
      }

      return {
        videos,
        nextPageToken: res.data?.nextPageToken ?? "",
        query: trimmed,
      };
    } catch (error) {
      const message = getYouTubeApiErrorMessage(
        error,
        "Ошибка поиска по каналу",
      );
      return rejectWithValue(message || "Ошибка поиска по каналу");
    }
  },
);

export const fetchChannelHomeTC = createAsyncThunk(
  "channel/fetchHome",
  async (channelId, { rejectWithValue }) => {
    try {
      const channelRes = await getChannelById(channelId);
      const channel = channelRes.data?.items?.[0];

      if (!channel) {
        return rejectWithValue("Канал не найден");
      }

      const uploadsPlaylistId =
        channel.contentDetails?.relatedPlaylists?.uploads ?? "";

      let videos = [];
      let nextPageToken = "";

      if (uploadsPlaylistId) {
        const page = await loadPlaylistPage({
          uploadsPlaylistId,
          pageToken: "",
        });
        videos = page.videos;
        nextPageToken = page.nextPageToken;
      }

      return {
        channel,
        uploadsPlaylistId,
        videos,
        nextPageToken,
      };
    } catch (error) {
      const message = getYouTubeApiErrorMessage(error, "Ошибка загрузки канала");
      return rejectWithValue(message || "Ошибка загрузки канала");
    }
  },
  {
    condition: (channelId, { getState }) => {
      const slice = getState().channelSlice;
      if (slice.loading.channel) return false;
      if (slice.channel?.id === channelId && slice.allVideos.length > 0) {
        return false;
      }
      return true;
    },
  },
);
