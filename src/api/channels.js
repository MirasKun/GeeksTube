import { instance } from "./instance";

const CHANNEL_PARTS = "snippet,statistics,contentDetails";
export const PLAYLIST_PAGE_SIZE = 50;

export const getChannelById = (channelId, config = {}) =>
  instance.get("/channels", {
    ...config,
    params: {
      part: CHANNEL_PARTS,
      id: channelId,
    },
  });

export const searchChannelVideos = ({
  channelId,
  q = "",
  order = "date",
  pageToken = "",
  maxResults = PLAYLIST_PAGE_SIZE,
}) =>
  instance.get("/search", {
    params: {
      part: "snippet",
      channelId,
      type: "video",
      order,
      q: q || undefined,
      maxResults,
      pageToken: pageToken || undefined,
    },
  });

export const getPlaylistItems = (
  { playlistId, pageToken = "", maxResults = PLAYLIST_PAGE_SIZE },
  config = {},
) =>
  instance.get("/playlistItems", {
    ...config,
    params: {
      part: "snippet,contentDetails",
      playlistId,
      maxResults,
      pageToken: pageToken || undefined,
    },
  });

export const getVideosByIds = (videoIds, config = {}) => {
  if (!videoIds.length) {
    return Promise.resolve({ data: { items: [] } });
  }

  return instance.get("/videos", {
    ...config,
    params: {
      part: "snippet,statistics",
      id: videoIds.join(","),
    },
  });
};

export const extractVideoIds = (items = []) =>
  items
    .map(
      (item) =>
        item.id?.videoId ||
        item.snippet?.resourceId?.videoId ||
        (typeof item.id === "string" && !item.id.startsWith("PL")
          ? item.id
          : null),
    )
    .filter(Boolean);

export const mapSearchItemToVideo = (item) => {
  const videoId =
    item.id?.videoId ||
    item.snippet?.resourceId?.videoId ||
    (typeof item.id === "string" && !item.id.startsWith("PL") ? item.id : null);

  if (!videoId || !item.snippet) return null;

  return {
    id: videoId,
    snippet: item.snippet,
    statistics: item.statistics ?? {},
  };
};

export const itemsToVideos = (items = []) =>
  items.map(mapSearchItemToVideo).filter(Boolean);

export const enrichSearchItems = async (items = [], config = {}) => {
  const fallback = itemsToVideos(items);
  if (!fallback.length) return [];

  const videoIds = extractVideoIds(items);
  if (!videoIds.length) return fallback;

  try {
    const byId = new Map();

    for (let i = 0; i < videoIds.length; i += PLAYLIST_PAGE_SIZE) {
      const chunk = videoIds.slice(i, i + PLAYLIST_PAGE_SIZE);
      const res = await getVideosByIds(chunk, config);
      for (const video of res.data.items ?? []) {
        byId.set(video.id, video);
      }
    }

    return videoIds
      .map((id) => {
        const full = byId.get(id);
        if (!full) return fallback.find((video) => video.id === id);
        return {
          id,
          snippet: full.snippet ?? fallback.find((v) => v.id === id)?.snippet,
          statistics: full.statistics ?? {},
        };
      })
      .filter(Boolean);
  } catch (error) {
    console.error("enrichSearchItems:", error);
    return fallback;
  }
};
