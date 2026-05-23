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
        {loading && (
          <h1 className="text-white text-center mt-10">Загрузка...</h1>
        )}
        {error && (
          <h1 className="text-red-500 text-center mt-10">Ошибка: {error}</h1>
        )}
        {!loading && <VideoGrid videos={items} />}
      </div>
    </div>
  );
};

export default HomePage;
