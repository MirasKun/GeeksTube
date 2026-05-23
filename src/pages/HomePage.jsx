import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecomendedVideosTC } from "../store/thunks/fetchRecomended";
import VideoGrid from "../components/videos/VideoGrid";

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.recomendedSlice,
  );

  useEffect(() => {
    dispatch(fetchRecomendedVideosTC());
  }, [dispatch]);

  return (
    <div>
      <div className="flex-1">
       <VideoGrid/>
      </div>
    </div>
  );
};

export default HomePage;
