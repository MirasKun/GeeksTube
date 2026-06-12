import YouTube from "react-youtube";

const ShortsPlayer = ({ video, videoId, onNext, onPrev }) => {
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      loop: 1,
      playlist: videoId,
      controls: 0,
      rel: 0,
    },
  };

  return (
    <div className="flex justify-between w-300">
      <div className="flex items-end w-80">
        <div className="flex flex-col">
            <div>
                <img src="" alt="" />
            </div>
          <span className="flex items-center gap-3">@{video?.snippet?.channelTitle}
            <button className="flex items-center justify-center w-30 h-8 rounded-full text-[14px] font-bold bg-white text-black">Подписаться</button>
          </span>

          <p className="">{video?.snippet?.title}</p>
        </div>
      </div>
      <div className="flex gap">
        <div className="flex justify-center w-110 h-[80vh] rounded-2xl overflow-hidden">
          <YouTube
            key={videoId}
            videoId={videoId}
            opts={opts}
            onEnd={() => onNext()}
            iframeClassName="w-full h-full"
            className="w-full h-full"
          />
        </div>

        <div className="flex items-end">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col items-center gap-1">
              <button className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border-none text-white text-xl">
                <img src="/Watch/Like_YouTube.svg" alt="" />
              </button>
              <p className="text-white text-xs">113 тыс.</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border-none text-white text-xl">
                <img src="/Watch/Dislike_YouTube.svg" alt="" />
              </button>
              <p className="text-white text-xs">Не нравится</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border-none text-white text-xl">
                <img src="/shorts/Comment_YouTube.svg" alt="" />
              </button>
              <p className="text-white text-xs">478</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button className="flex items-center justify-center w-11 h-11 rounded-full bg-white/10 border-none text-white text-xl">
                <img src="/Watch/Share_YouTube.svg" alt="" />
              </button>
              <p className="text-white text-xs">Поделиться</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center ml-15 gap-4">
        <div className="flex w-20 h-15 justify-center">
          <button
            className="w-15 h-15 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl hover:bg-white/20"
            onClick={onPrev}
          >
            ↑
          </button>
        </div>
        <div className="flex w-20 h-15 justify-center">
          <button
            className="w-15 h-15 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl hover:bg-white/20"
            onClick={onNext}
          >
            ↓
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortsPlayer;
