import { createSlice } from "@reduxjs/toolkit";
import { fetchLikedVideosTC } from "../thunks/interactions/fetchLikedVideos";
import { fetchVideoRatingTC } from "../thunks/interactions/fetchVideoRating";
import { rateVideoTC } from "../thunks/interactions/rateVideo";
import { checkSubscriptionTC } from "../thunks/interactions/checkSubscription";
import { toggleSubscriptionTC } from "../thunks/interactions/toggleSubscription";

const initialState = {
  currentRating: "none",

  isSubscribed: false,
  subscriptionId: null,

  likedVideos: [],
  nextPageToken: null,

  loading: {
    likedVideos: false,
    rating: false,
    subscription: false,
  },
  errors: {
    likedVideos: null,
    rating: null,
    subscription: null,
  },
};

const interactionsSlice = createSlice({
  name: "interactions",
  initialState,
  reducers: {
    resetCurrentVideoInteractions: (state) => {
      state.currentRating = "none";
      state.isSubscribed = false;
      state.subscriptionId = null;
      state.errors.rating = null;
      state.errors.subscription = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideoRatingTC.pending, (state) => {
        state.loading.rating = true;
        state.errors.rating = null;
      })
      .addCase(fetchVideoRatingTC.fulfilled, (state, action) => {
        state.loading.rating = false;
        state.currentRating = action.payload;
      })
      .addCase(fetchVideoRatingTC.rejected, (state, action) => {
        state.loading.rating = false;
        state.errors.rating =
          action.payload || "Не удалось получить оценку видео";
      })

      .addCase(rateVideoTC.pending, (state) => {
        state.loading.rating = true;
        state.errors.rating = null;
      })
      .addCase(rateVideoTC.fulfilled, (state, action) => {
        state.loading.rating = false;
        state.currentRating = action.payload;
      })
      .addCase(rateVideoTC.rejected, (state, action) => {
        state.loading.rating = false;
        state.errors.rating =
          action.payload || "Не удалось изменить оценку видео";
      })

      .addCase(checkSubscriptionTC.pending, (state) => {
        state.loading.subscription = true;
        state.errors.subscription = null;
      })
      .addCase(checkSubscriptionTC.fulfilled, (state, action) => {
        state.loading.subscription = false;
        state.isSubscribed = action.payload.isSubscribed;
        state.subscriptionId = action.payload.subscriptionId;
      })
      .addCase(checkSubscriptionTC.rejected, (state, action) => {
        state.loading.subscription = false;
        state.errors.subscription =
          action.payload || "Не удалось проверить подписку";
      })

      .addCase(toggleSubscriptionTC.pending, (state) => {
        state.loading.subscription = true;
        state.errors.subscription = null;
      })
      .addCase(toggleSubscriptionTC.fulfilled, (state, action) => {
        state.loading.subscription = false;
        state.isSubscribed = action.payload.isSubscribed;
        state.subscriptionId = action.payload.subscriptionId;
      })
      .addCase(toggleSubscriptionTC.rejected, (state, action) => {
        state.loading.subscription = false;
        state.errors.subscription =
          action.payload || "Не удалось изменить статус подписки";
      })

      .addCase(fetchLikedVideosTC.pending, (state) => {
        state.loading.likedVideos = true;
        state.errors.likedVideos = null;
      })
      .addCase(fetchLikedVideosTC.fulfilled, (state, action) => {
        state.loading.likedVideos = false;

        if (!action.meta.arg) {
          state.likedVideos = action.payload.items;
        } else {
          state.likedVideos = [...state.likedVideos, ...action.payload.items];
        }

        state.nextPageToken = action.payload.nextPageToken;
      })
      .addCase(fetchLikedVideosTC.rejected, (state, action) => {
        state.loading.likedVideos = false;
        state.errors.likedVideos =
          action.payload || "Не удалось загрузить понравившиеся видео";
      });
  },
});

export const { resetCurrentVideoInteractions } = interactionsSlice.actions;
export default interactionsSlice.reducer;
