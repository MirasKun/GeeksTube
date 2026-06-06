import { createSlice } from "@reduxjs/toolkit";
import {
  fetchChannelHomeTC,
  fetchChannelVideosTC,
  searchInChannelTC,
} from "../thunks/spec/channel/channelThunks";

const appendUniqueVideos = (existing, incoming) => {
  const ids = new Set(existing.map((video) => video.id));
  const unique = incoming.filter((video) => video.id && !ids.has(video.id));
  return [...existing, ...unique];
};

const syncDerivedSections = (state) => {
  if (!state.allVideos.length) {
    state.forYouVideos = [];
    state.popularVideos = [];
    return;
  }

  state.forYouVideos = state.allVideos.slice(0, 12);
  state.popularVideos = [...state.allVideos]
    .sort(
      (a, b) =>
        Number(b.statistics?.viewCount || 0) -
        Number(a.statistics?.viewCount || 0),
    )
    .slice(0, 12);
};

const initialState = {
  channel: null,
  activeTab: "home",
  videosView: "latest",
  forYouVideos: [],
  popularVideos: [],
  allVideos: [],
  uploadsPlaylistId: "",
  searchResults: [],
  searchQuery: "",
  searchError: null,
  subscribedChannelIds: [],
  loading: {
    channel: false,
    videos: false,
    search: false,
  },
  nextPageToken: {
    videos: "",
    search: "",
  },
  error: null,
  videosError: null,
};

const channelSlice = createSlice({
  name: "channel",
  initialState,
  reducers: {
    setChannelTab(state, action) {
      state.activeTab = action.payload;
    },
    setVideosView(state, action) {
      state.videosView = action.payload;
    },
    setChannelSearchQuery(state, action) {
      state.searchQuery = action.payload;
    },
    resetChannelState(state) {
      const subscriptions = state.subscribedChannelIds.length
        ? state.subscribedChannelIds
        : JSON.parse(localStorage.getItem("subscribed_channels") || "[]");

      Object.assign(state, {
        ...initialState,
        subscribedChannelIds: subscriptions,
      });
    },
    toggleChannelSubscription(state, action) {
      const channelId = action.payload;
      const subscribed = new Set(state.subscribedChannelIds);

      if (subscribed.has(channelId)) {
        subscribed.delete(channelId);
      } else {
        subscribed.add(channelId);
      }

      state.subscribedChannelIds = [...subscribed];
      localStorage.setItem(
        "subscribed_channels",
        JSON.stringify(state.subscribedChannelIds),
      );
    },
    hydrateSubscriptions(state) {
      state.subscribedChannelIds = JSON.parse(
        localStorage.getItem("subscribed_channels") || "[]",
      );
    },
    clearChannelSearch(state) {
      state.searchResults = [];
      state.searchQuery = "";
      state.searchError = null;
      state.nextPageToken.search = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChannelHomeTC.pending, (state) => {
        state.loading.channel = true;
        state.loading.videos = true;
        state.error = null;
        state.videosError = null;
      })
      .addCase(fetchChannelHomeTC.fulfilled, (state, action) => {
        state.loading.channel = false;
        state.loading.videos = false;
        state.channel = action.payload.channel;
        state.uploadsPlaylistId = action.payload.uploadsPlaylistId ?? "";
        state.allVideos = action.payload.videos ?? [];
        state.nextPageToken.videos = action.payload.nextPageToken ?? "";
        syncDerivedSections(state);
      })
      .addCase(fetchChannelHomeTC.rejected, (state, action) => {
        state.loading.channel = false;
        state.loading.videos = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchChannelVideosTC.pending, (state) => {
        state.loading.videos = true;
        state.videosError = null;
      })
      .addCase(fetchChannelVideosTC.fulfilled, (state, action) => {
        state.loading.videos = false;

        const isFirstPage = !action.meta.arg.pageToken;
        const videos = action.payload.videos ?? [];

        state.allVideos = isFirstPage
          ? videos
          : appendUniqueVideos(state.allVideos, videos);

        syncDerivedSections(state);
        state.nextPageToken.videos = action.payload.nextPageToken;
      })
      .addCase(fetchChannelVideosTC.rejected, (state, action) => {
        state.loading.videos = false;
        state.videosError = action.payload || action.error.message;
      })

      .addCase(searchInChannelTC.pending, (state, action) => {
        state.loading.search = true;
        state.searchError = null;

        if (!action.meta.arg.pageToken) {
          state.searchResults = [];
        }
      })
      .addCase(searchInChannelTC.fulfilled, (state, action) => {
        state.loading.search = false;

        const isFirstPage = !action.meta.arg.pageToken;
        const videos = action.payload.videos ?? [];

        state.searchResults = isFirstPage
          ? videos
          : appendUniqueVideos(state.searchResults, videos);
        state.searchQuery = action.payload.query ?? state.searchQuery;
        state.nextPageToken.search = action.payload.nextPageToken ?? "";
      })
      .addCase(searchInChannelTC.rejected, (state, action) => {
        state.loading.search = false;
        state.searchError = action.payload || action.error.message;
      });
  },
});

export const {
  setChannelTab,
  setVideosView,
  setChannelSearchQuery,
  resetChannelState,
  toggleChannelSubscription,
  hydrateSubscriptions,
  clearChannelSearch,
} = channelSlice.actions;

export default channelSlice.reducer;
