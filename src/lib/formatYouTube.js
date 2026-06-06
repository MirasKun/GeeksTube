export const formatCount = (value, locale = "ru-RU") => {
  const num = Number(value);
  if (!Number.isFinite(num)) return "0";

  if (num >= 1_000_000) {
    const millions = num / 1_000_000;
    return `${millions.toFixed(millions >= 10 ? 0 : 1).replace(".", ",")} млн`;
  }

  if (num >= 1_000) {
    const thousands = num / 1_000;
    return `${thousands.toFixed(thousands >= 100 ? 0 : 1).replace(".", ",")} тыс.`;
  }

  return num.toLocaleString(locale);
};

export const formatViews = (viewCount) => {
  if (!viewCount) return "0 просмотров";
  return `${formatCount(viewCount)} просмотров`;
};

export const formatSubscribers = (count) => {

  const num = Number(count);
  if (!num) return "0 подписчиков";

  const formatted = formatCount(num);


  if (num >= 1000) return `${formatted} подписчиков`;


  const lastDigit = num % 10;
  const lastTwoDigits = num % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 14) return `${num} подписчиков`;
  if (lastDigit === 1) return `${num} подписчик`;
  if (lastDigit >= 2 && lastDigit <= 4) return `${num} подписчика`;

  return `${num} подписчиков`;
};


export const parseIsoDuration = (isoDuration) => {
  if (!isoDuration) return "";

  const match = isoDuration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "";

  const hours = Number(match[1] || 0);
  const minutes = Number(match[2] || 0);
  const seconds = Number(match[3] || 0);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  return `${minutes}:${String(seconds).padStart(2, "0")}`;
};
