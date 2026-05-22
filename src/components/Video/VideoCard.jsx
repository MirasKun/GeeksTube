import { MoreOutlined, } from "@ant-design/icons";

export  const VideoCard = ({ video, onVideoClick }) => {
  const {
    id,
    img,
    duration,
    title,
    channelName,
    channel,
    views,
    publishedAt,
  } = video;

  return (
    <article
      onClick={() => onVideoClick(id)}
      className="flex flex-col gap-3 w-full max-w-119 p-2 rounded-xl cursor-pointer transition-colors duration-500 hover:bg-zinc-400/40"
    >
      <div className="relative aspect-476/266 w-full bg-zinc-800 rounded-[15.9px] overflow-hidden group-hover:rounded-none transition-all duration-200">
        <img
          src={img}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[12px] font-medium px-1.5 py-0.5 rrounded-sm tracking-wide rounded-md">
          {duration}
        </span>
      </div>

      <div
        className="grid grid-cols-[36px_1fr] gap-x-3 px-1 relative"
      >
        <div className="w-9 h-9 rounded-full bg-zinc-700 overflow-hidden shrink-0">
          <img
            src={channel}
            alt={channelName}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex flex-col min-w-0 pr-6">
          <h3 className="text-white text-[14px] font-medium leading-5 line-clamp-2 group-hover:text-zinc-200">
            {title}
          </h3>

          <div className="text-[#aaa] text-[13px] mt-1.5 flex items-center gap-1">
            <span className="truncate hover:text-white transition-colors">
              {channelName}
            </span>
          </div>

          <div className="text-[#aaa] text-[13px] mt-0.5 flex items-center gap-1">
            <span>{views}</span>
            <span className="before:content-['•'] before:mx-1">
              {publishedAt}
            </span>
          </div>
        </div>
        
        <div className="absolute right-0 top-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              alert(`Заглушка меню для видео ID: ${id}`);
            }}
            className="w-8 h-8 flex items-center justify-center rounded-full text-white hover:bg-zinc-800 transition-colors"
          >
            <MoreOutlined className="text-[18px]" />
          </button>
        </div>
      </div>
    </article>
  );
};

