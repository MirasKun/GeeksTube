import { instance } from "./instance.js";

export const getRecomendedVideos = (pageToken = "") => {
  return instance.get("/videos", {
    params: {
      part: "snippet,contentDetails,statistics",
      chart: "mostPopular",
      regionCode: "RU",
      maxResults: 50,
      pageToken,
    },
  });
};

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

export const getVideoById = (videoId) => {
  return instance.get("/videos", {
    params: {
      part: "snippet,contentDetails,statistics",
      id: videoId,
    },
  });
};
