import YouTube from "react-youtube";

const ShortsPlayer = ({ videoId, onNext, onPrev }) => {
  const opts = {
    width: "100%",
    height: "100%",
    playerVars: {
      autoplay: 1,
      mute: 1,
      loop: 1,
      playlist: videoId,
      controls: 0,
      rel: 0,
    },
  };

  return (
    <div className="flex justify-center">
      <div className="flex w-[80vh] h-[85vh] rounded-xl overflow-hidden bg-black">
        <YouTube
          key={videoId}
          videoId={videoId}
          opts={opts}
          onEnd={() => onNext()}
          iframeClassName="w-full h-full"
        />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <div className="flex w-20 h-10 justify-center">
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg hover:bg-white/20" onClick={onPrev}>
            ↑
          </button>
        </div>
        <div className="flex w-20 h-10 justify-center">
          <button className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg hover:bg-white/20" onClick={onNext}>
            ↓
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShortsPlayer;
