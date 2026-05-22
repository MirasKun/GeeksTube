import { useState, useEffect } from "react"; 
import { VideoCard } from "./VideoCard";
import { data } from "./generateVideos";

const HomePage = () => {
  const [videos, setVideos] = useState([]);
  const [visible, setVisible] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loaderElement, setLoaderElement] = useState(null);


  useEffect(() => {
    const loadData = async () => {
      try {
        if (videos.length === 0) setIsLoading(true);
        
        await new Promise((resolve) => setTimeout(resolve, 500));
        
        setVideos(data.slice(0, visible));
        setError(null);
      } catch (error) {
        setError('error');
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, );


  return (
    <main className="min-h-screen bg-[#0f0f0f] p-6 text-white font-sans">
      {error ? (
        <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4">
          <p className="text-white text-lg font-medium mb-2">Произошла ошибка</p>
          <p className="text-zinc-500 mb-6">{error}</p>
        </div>
      ) : isLoading && videos.length === 0 ? (
        <div className="flex items-center justify-center min-h-[80vh]">
          <p className="text-white text-lg">Загрузка...</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-6 max-w-375 mx-auto justify-items-center">
            {videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                onVideoClick={(id) => console.log(`Open video: ${id}`)}
              />
            ))}
          </div>

          <div ref={setLoaderElement} className="h-24 w-full flex items-center justify-center"> 
            {isLoading && (
              <div className="w-8 h-8 border-3 border-zinc-800 border-t-white rounded-full animate-spin" />
            )}
          </div>
        </>
      )}
    </main>
  );
};


export default HomePage;
