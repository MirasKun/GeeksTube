export const sanitizeApiMessage = (message) => {
  if (!message || typeof message !== "string") return "";

  const text = message.replace(/<[^>]*>/g, "").trim();
  const lower = text.toLowerCase();

  if (
    lower.includes("quota") ||
    lower.includes("exceeded your") ||
    lower.includes("daily limit")
  ) {
    return "Исчерпана API";
  }

  return text;
};

export const getYouTubeApiErrorMessage = (error, fallback = "Ошибка запроса") => {
  if (!error) return fallback;

  if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
    return null;
  }

  const status = error.response?.status;
  const raw =
    error.response?.data?.error?.message || error.message || fallback;

  if (status === 429) {
    return "Слишком много запросов";
  }

  if (status === 403) {
    return sanitizeApiMessage(raw) || "Доступ к API запрещён";
  }

  return sanitizeApiMessage(raw) || fallback;
};
