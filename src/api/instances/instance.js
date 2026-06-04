import axios from "axios";

export const instance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
  timeout: 60000,
  params: {
    key: import.meta.env.VITE_YOUTUBE_API_KEY,
  },
});
