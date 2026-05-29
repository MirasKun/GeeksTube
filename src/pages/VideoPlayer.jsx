

const VideoPlayer = ({ videoId }) => {
  return <div>
     <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
      <iframe
        className="w-full h-full"
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  </div>;
};

export default VideoPlayer;
