import { createAsyncThunk } from "@reduxjs/toolkit";
import { youtubePrivateInstance } from "../../../api/instances/youtubePrivateInstance";

export const toggleSubscriptionTC = createAsyncThunk(
  "interactions/toggleSubscription",
  async ({ channelId, isSubscribed, subscriptionId }, { rejectWithValue }) => {
    try {
      if (isSubscribed && subscriptionId) {
        await youtubePrivateInstance.delete("/subscriptions", {
          params: { id: subscriptionId },
        });
        return { isSubscribed: false, subscriptionId: null };
      } else {
        const response = await youtubePrivateInstance.post(
          "/subscriptions",
          {
            snippet: {
              resourceId: { kind: "youtube#channel", channelId },
            },
          },
          { params: { part: "snippet" } },
        );
        return { isSubscribed: true, subscriptionId: response.data.id };
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  },
);
