import { createAsyncThunk } from "@reduxjs/toolkit";
import { youtubePrivateInstance } from "../../../api/instances/youtubePrivateInstance";

const mapSubscriptionToChannel = (item) => {
  const snippet = item?.snippet;
  const channelId = snippet?.resourceId?.channelId;

  if (!channelId || !snippet) return null;

  return {
    id: channelId,
    subscriptionId: item.id,
    title: snippet.title ?? "Канал",
    description: snippet.description ?? "",
    avatar:
      snippet.thumbnails?.default?.url ||
      snippet.thumbnails?.medium?.url ||
      snippet.thumbnails?.high?.url ||
      "",
  };
};

export const fetchSubscribedChannelsTC = createAsyncThunk(
  "interactions/fetchSubscribedChannels",
  async (_, { rejectWithValue }) => {
    try {
      const response = await youtubePrivateInstance.get("/subscriptions", {
        params: {
          part: "snippet",
          mine: true,
          maxResults: 50,
          order: "alphabetical",
        },
      });

      return {
        channels: (response.data.items ?? [])
          .map(mapSubscriptionToChannel)
          .filter(Boolean),
        nextPageToken: response.data.nextPageToken ?? null,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);
