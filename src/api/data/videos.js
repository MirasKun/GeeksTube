import { instance } from "../instances/instance.js";


export const getVideosByCategory = (categoryId, pageToken = "") => {
  return instance.get("/videos", {
    params: {
      part: "snippet,contentDetails,statistics",
      chart: "mostPopular",
      videoCategoryId: categoryId,
      regionCode: "RU",
      maxResults: 20,
      pageToken,
    },
  });
};
