import { createAsyncThunk } from "@reduxjs/toolkit";
import { youtubePrivateInstance } from "../../../api/instances/youtubePrivateInstance";

export const checkSubscriptionTC = createAsyncThunk(
  "interactions/checkSubscription",
  async (channelId, { rejectWithValue }) => {
    try {
      const response = await youtubePrivateInstance.get("/subscriptions", {
        params: { part: "snippet", mine: true, forChannelId: channelId },
      });
      const item = response.data.items?.[0];
      return {
        isSubscribed: !!item,
        subscriptionId: item ? item.id : null,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);
