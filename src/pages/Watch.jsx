import { useParams, useSearchParams } from "react-router-dom";
import VideoPlayer from "../components/players/VideoPlayer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import WatchVideoGrid from "../components/videos/WatchVideoGrid";
import { fetchVideoByIdTC } from "../store/thunks/spec/fetchVideoById";

const Watch = () => {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { searchVideoId } = useSearchParams();
  const { video } = useSelector((s) => s.videoByIdSlice);


  useEffect(() => {
    dispatch(fetchVideoByIdTC(videoId));
  }, [dispatch, videoId]);

  const videoTitle = video.snippet?.title;
  const channelTitle = video.snippet?.channelTitle;
  const likeCount = video.statistics?.likeCount;
  const viewCount = video.statistics?.viewCount;
  const description = video.snippet?.description;

  console.log(video);
  return (
    <div>
      <div className="w-full max-w-450 px-4 py-6">
        <div className="flex gap-6">
          <div className="w-960">
            <VideoPlayer videoId={videoId} searchVideoId={searchVideoId} />

            <h1 className="mt-4 text-xl text-white">{videoTitle}</h1>
            <div className="mt-3 flex items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-500">
                  <h1 className="text-white font-bold">EE</h1>
                </div>
                <div>
                  <p className="text-white">{channelTitle}</p>
                  <p className="text-sm text-gray-400">97,8 млн подписчиков</p>
                </div>

                <button className="bg-white text-black px-4 py-2 rounded-full">
                  Подписаться
                </button>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-zinc-800 gap-1.5 px-5 py-2 rounded-full">
                  <button className="flex items-center gap-2 text-white">
                    <img
                      className="w-7 h-7"
                      src="/Watch/Like_YouTube.svg"
                      alt="Like"
                    />
                    <p className="font-bold text-[15px]">{likeCount}</p>
                  </button>
                  <div className="w-px h-5 bg-zinc-500" />
                  <button className="flex items-center text-white">
                    <img
                      className="w-7 h-7"
                      src="/Watch/Dislike_YouTube.svg"
                      alt="dislike"
                    />
                  </button>
                </div>
                <div className="flex items-center bg-zinc-800 gap-1 px-3 py-2.5 rounded-full">
                  <button className="flex items-center gap-1 text-white">
                    <img
                      className="w-6 h-6"
                      src="/Watch/Share_YouTube.svg"
                      alt="Share"
                    />
                    <p className=" font-bold">Поделиться</p>
                  </button>
                </div>
                <div className="flex items-center bg-zinc-800 gap-1 px-3 py-2.5 rounded-full hover:bg-gray-500">
                  <button className="flex items-center gap-1 text-white">
                    <img src="/Watch/Watch_later_YouTube.svg" alt="Watch_Later" />
                    <p className="font-bold">Смотреть позже</p>
                  </button>
                </div>
                <div className="flex items-center bg-zinc-800 gap-1.5 px-3 py-2 rounded-full">
                  <button className="flex items-center ">
                    <img
                      className="w-7 h-7"
                      src="/Watch/Burger..._YouTube.svg"
                      alt="Burger"
                    />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-zinc-900 p-4 text-sm text-gray-200">
              <p>{viewCount} просмотров</p>
              <p className="mt-2">{description}</p>
            </div>
          </div>

          <div className="w-400">
            <h2 className="mb-3 text-white">Рекомендации</h2>

            <div className="grid grid-cols-1">
              {/* <div className="flex gap-3">
                <div className="w-40 h-23 bg-zinc-800 rounded-lg" />
                <div>
                  <p className="text-sm text-white">Другое интересное видео</p>
                  <p className="mt-1 text-xs text-gray-400">Канал</p>
                  <div>
                    <p className="text-xs text-gray-400">67 тыс. просмотров</p>
                    <p className="text-xs text-gray-400">5 лет назад</p>
                  </div>
                </div>
              </div> */}
              <WatchVideoGrid/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
