import { useDispatch, useSelector } from 'react-redux';
import VideoCard from './VideoCard'
import { useEffect } from 'react';
import { fetchRecomendedVideosTC } from '../store/thunks/fetchRecomended';

const VideoGrid = () => {
   const dispatch = useDispatch();
  const { items, loading, error } = useSelector(
    (state) => state.recomendedSlice,
  );

  useEffect(() => {
    dispatch(fetchRecomendedVideosTC());
  }, [dispatch]);

  if (loading) return <h1>Loading</h1>
  if (error) return

  console.log(items);
  

  

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {items.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  )
}

export default VideoGrid