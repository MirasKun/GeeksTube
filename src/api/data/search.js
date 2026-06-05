import { instance } from "../instances/instance";

export const getSearchResults = (searchQuery) =>
  instance.get("/search", {
    params: {
      q: searchQuery,
      part: "snippet",
      maxResults: 10,
      type: "video",
    },
  });