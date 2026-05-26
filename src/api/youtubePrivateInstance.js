import axios from "axios";

export const youtubePrivateInstance = axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3",
});

youtubePrivateInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("youtube_google_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

youtubePrivateInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("youtube_google_token");
      window.location.reload();
    }

    return Promise.reject(error);
  },
);
