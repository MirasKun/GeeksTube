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
    <div className="flex justify-center items-center gap-6 px-4">
      <div className="hidden lg:flex flex-col self-end w-64">
        <span className="flex items-center gap-3 text-sm">
          @{video?.snippet?.channelTitle}
          <button className="flex items-center justify-center px-4 h-8 rounded-full text-[14px] font-bold bg-white text-black">
            Подписаться
          </button>
        </span>

        <p className="text-sm mt-2">{video?.snippet?.title}</p>
      </div>

      <div className="flex gap-3 items-center">
        <div className="flex justify-center w-[280px] sm:w-[400px] md:w-[440px] lg:w-[440px] h-[70vh] sm:h-[80vh] rounded-2xl overflow-hidden shrink-0">
          <YouTube
            key={videoId}
            videoId={videoId}
            opts={opts}
            onEnd={() => onNext()}
            iframeClassName="w-full h-full"
            className="w-full h-full"
          />
        </div>

        <div className="flex items-center">
          <div className="flex flex-col gap-4 sm:gap-5">
            <div className="flex flex-col items-center gap-1">
              <button className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10">
                <img
                  src="/Watch/Like_YouTube.svg"
                  alt=""
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>
              <p className="text-white text-[10px] sm:text-xs">113 тыс.</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10">
                <img
                  src="/Watch/Dislike_YouTube.svg"
                  alt=""
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>
              <p className="text-white text-[10px] sm:text-xs">Не нравится</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10">
                <img
                  src="/shorts/Comment_YouTube.svg"
                  alt=""
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>
              <p className="text-white text-[10px] sm:text-xs">478</p>
            </div>

            <div className="flex flex-col items-center gap-1">
              <button className="flex items-center justify-center w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/10">
                <img
                  src="/Watch/Share_YouTube.svg"
                  alt=""
                  className="w-4 h-4 sm:w-5 sm:h-5"
                />
              </button>
              <p className="text-white text-[10px] sm:text-xs">Поделиться</p>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-col justify-center gap-4 ml-8">
        <button
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl hover:bg-white/20"
          onClick={onPrev}
        >
          ↑
        </button>

        <button
          className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white text-3xl hover:bg-white/20"
          onClick={onNext}
        >
          ↓
        </button>
      </div>

      <div className="flex flex-col lg:hidden w-full max-w-[400px]">
        <span className="flex items-center gap-3 text-sm">
          @{video?.snippet?.channelTitle}
          <button className="flex items-center justify-center px-4 h-8 rounded-full text-[14px] font-bold bg-white text-black">
            Подписаться
          </button>
        </span>

        <p className="text-sm mt-1">{video?.snippet?.title}</p>
      </div>
    </div>
  );
};

export default ShortsPlayer;
