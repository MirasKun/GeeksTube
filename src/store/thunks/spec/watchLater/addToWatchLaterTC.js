import { addToWatchLater } from "../../../slices/spec/watchLaterSlice";

export const addToWatchLaterTC = () => (dispatch, getState) => {
  const { videoByIdSlice } = getState();

  const video = videoByIdSlice.video;

  if (!video) return;

  dispatch(addToWatchLater(video));
};