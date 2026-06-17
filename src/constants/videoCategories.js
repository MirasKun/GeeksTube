export const VIDEO_CATEGORY_KEYS = {
  ALL: "all",
  MUSIC: "music",
  GAMING: "gaming",
};

export const VIDEO_CATEGORY_FILTERS = [
  {
    key: VIDEO_CATEGORY_KEYS.ALL,
    label: "Все",
  },
  {
    key: VIDEO_CATEGORY_KEYS.MUSIC,
    label: "Музыка",
    youtubeCategoryId: "10",
  },
  {
    key: VIDEO_CATEGORY_KEYS.GAMING,
    label: "Видеоигры",
    youtubeCategoryId: "20",
  },
];

export const VIDEO_CATEGORIES_BY_KEY = VIDEO_CATEGORY_FILTERS.reduce(
  (categories, category) => ({
    ...categories,
    [category.key]: category,
  }),
  {},
);
