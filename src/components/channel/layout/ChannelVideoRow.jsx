import { useRef } from "react";
import ChannelVideoCard from "./ChannelVideoCard";

const ChannelVideoRow = ({
  title,
  videos,
  loading,
  emptyText = "Нет видео",
}) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * 320, behavior: "smooth" });
  };

  if (!loading && videos.length === 0) {
    return (
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>
        <p className="text-sm text-[#aaaaaa]">{emptyText}</p>
      </section>
    );
  }

  return (
    <section className="mb-8">
      <h2 className="mb-4 text-xl font-semibold text-white">{title}</h2>

      <div className="relative">
        {videos.length > 3 && (
          <button
            type="button"
            onClick={() => scroll(1)}
            className="absolute right-0 top-20 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[#272727] text-white shadow-lg hover:bg-[#3f3f3f]"
            aria-label="Прокрутить вправо"
          >
            ›
          </button>
        )}

        <div
          ref={scrollRef}
          className="flex gap-3 sm:gap-4 overflow-x-auto pb-2"
          style={{ scrollbarWidth: "none" }}
        >
          {loading && videos.length === 0
            ? Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-video w-72 shrink-0 animate-pulse rounded-xl bg-zinc-800"
                />
              ))
            : videos.map((video) => (
                <ChannelVideoCard key={video.id} video={video} compact />
              ))}
        </div>
      </div>
    </section>
  );
};

export default ChannelVideoRow;
