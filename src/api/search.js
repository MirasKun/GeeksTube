import { instance } from "./instance";

export const getSearchResults = (searchQuery) =>
  instance.get("/search", {
    params: {
      q: searchQuery,
      part: "snippet",
      maxResults: 10,
      type: "video",
    },
  });
