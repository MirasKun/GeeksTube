import VideoPlayer from "./VideoPlayer";

const Watch = () => {
  return (
    <div>
      <div className="w-full max-w-450 px-4 py-6">
        <div className="flex gap-6">
          <div className="w-960">
            <VideoPlayer videoId="zKzoIZ9rT_4" />

            <h1 className="mt-4 text-xl text-white">Название видео</h1>
            <div className="mt-3 flex items-center gap-4 justify-between">
              <div className="flex items-center gap-4">
                <div className="w-9 h-9 rounded-full flex items-center justify-center bg-blue-500">
                  <h1 className="text-white font-bold">EE</h1>
                </div>
                <div>
                  <p className="text-white">Название канала</p>
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
                    <p className="font-bold text-[15px]">46 тыс.</p>
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
                <div className="flex items-center bg-zinc-800 gap-1.5 px-5 py-2.5 rounded-full">
                  <button className="flex items-center gap-2 text-white">
                    <p className=" font-bold">Поделиться</p>
                  </button>
                </div>
                <div className="flex items-center bg-zinc-800 gap-1.5 px-5 py-2.5 rounded-full">
                  <button className="flex items-center gap-2 text-white">
                    <p className=" font-bold">Сохранить</p>
                  </button>
                </div>
                <div className="flex items-center bg-zinc-800 gap-1.5 px-4 py-2.5 rounded-full">
                  <button>
                    <p>67</p>
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-zinc-900 p-4 text-sm text-gray-200">
              <p>120 тыс. просмотров 2 дня назад</p>
              <p className="mt-2">
                Русские - ну и что, это песня вышла 10 лет назад
              </p>
            </div>
          </div>

          <div className="w-400">
            <h2 className="mb-3 text-white">Рекомендации</h2>

            <div>
              <div className="flex gap-3">
                <div className="w-40 h-23 bg-zinc-800 rounded-lg" />
                <div>
                  <p className="text-sm text-white">Другое интересное видео</p>
                  <p className="mt-1 text-xs text-gray-400">Канал</p>
                  <div>
                    <p className="text-xs text-gray-400">67 тыс. просмотров</p>
                    <p className="text-xs text-gray-400">5 лет назад</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
