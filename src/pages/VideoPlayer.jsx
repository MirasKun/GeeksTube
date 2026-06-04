import YouTube from 'react-youtube';

const VideoPlayer = ({ videoId, searchVideoId }) => {
  const opts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 1,
      rel: 0,       
      modestbranding: 1 
    },
  };

  return (
    <div className="aspect-video w-full bg-black rounded-xl overflow-hidden">
      <YouTube
        videoId={videoId}
        opts={opts}
        className="w-full h-full"
        iframeClassName="w-full h-full"
      />
    </div>
  );
};

export default VideoPlayer;
