import { useSelector } from 'react-redux';
import VideoCard from '../../components/videos/cards/VideoCard';

const WatchLater = () => {
    const watchLaterVideos = useSelector((state) => state.watchLater.videos);

  return (
    <>
      <div>
       <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-white">Смотреть позже</h1>

            {watchLaterVideos.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-[50vh] text-zinc-400">
                    <p className="text-lg">Здесь пока ничего нет</p>
                    <p className="text-sm text-zinc-500">Добавляйте видео с помощью кнопки «Смотреть позже»</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
                    {watchLaterVideos.map((video) => (
                        <VideoCard key={video.id} video={video} />
                    ))}
                </div>
            )}
        </div>
      </div>
    </>
  )
}

export default WatchLater
