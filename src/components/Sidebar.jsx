import React from "react";

const Sidebar = () => {
  return (
    <aside className="w-60 h-screen bg-[#0f0f0f] text-white flex flex-col px-3 py-4 font-sans select-none overflow-y-auto">
      <div className="flex flex-col gap-1 mb-4">
        <button className="flex items-center gap-5 w-full px-4 py-2.5 rounded-xl bg-white/10 text-white font-medium text-sm transition-colors">
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src="../../Home.svg"
              alt="Home"
              className="w-full h-full object-contain"
            />
          </span>
          <span>Home</span>
        </button>

        <button className="flex items-center gap-5 w-full px-4 py-2.5 rounded-xl text-zinc-300 hover:bg-white/5 font-normal text-sm transition-colors">
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src="../../Explore.svg"
              alt="Explore"
              className="w-full h-full object-contain"
            />
          </span>
          <span>Explore</span>
        </button>

        <button className="flex items-center gap-5 w-full px-4 py-2.5 rounded-xl text-zinc-300 hover:bg-white/5 font-normal text-sm transition-colors">
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src="../../Shorts.svg"
              alt="Shorts"
              className="w-full h-full object-contain"
            />
          </span>
          <span>Shorts</span>
        </button>

        <button className="flex items-center gap-5 w-full px-4 py-2.5 rounded-xl text-zinc-300 hover:bg-white/5 font-normal text-sm transition-colors">
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src="../../TVMode.svg"
              alt="TV Mode"
              className="w-full h-full object-contain"
            />
          </span>
          <span>TV Mode</span>
        </button>
      </div>

      <hr className="border-zinc-800 my-2" />

      <div className="flex flex-col gap-1 my-2">
        <button className="flex items-center gap-5 w-full px-4 py-2.5 rounded-xl text-zinc-300 hover:bg-white/5 font-normal text-sm transition-colors">
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src="../../History.svg"
              alt="History"
              className="w-full h-full object-contain"
            />
          </span>
          <span>History</span>
        </button>

        <button className="flex items-center gap-5 w-full px-4 py-2.5 rounded-xl text-zinc-300 hover:bg-white/5 font-normal text-sm transition-colors">
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src="../../WatchLater.svg"
              alt="Watch Later"
              className="w-full h-full object-contain"
            />
          </span>
          <span>Watch Later</span>
        </button>

        <button className="flex items-center gap-5 w-full px-4 py-2.5 rounded-xl text-zinc-300 hover:bg-white/5 font-normal text-sm transition-colors">
          <span className="w-5 h-5 flex items-center justify-center shrink-0">
            <img
              src="../../Liked.svg"
              alt="Liked Videos"
              className="w-full h-full object-contain"
            />
          </span>
          <span>Liked Videos</span>
        </button>

        <button className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-zinc-300 hover:bg-white/5 font-normal text-sm transition-colors">
          <div className="flex items-center gap-5">
            <span className="w-5 h-5 flex items-center justify-center shrink-0">
              <img
                src="../../Playlists.svg"
                alt="Playlists"
                className="w-full h-full object-contain"
              />
            </span>
            <span>Playlists</span>
          </div>
          <span className="w-4 h-4 flex items-center justify-center text-zinc-400 shrink-0">
            <img
              src="../../Arrow.svg"
              alt="Arrow"
              className="w-full h-full object-contain"
            />
          </span>
        </button>
      </div>

      <hr className="border-zinc-800 my-2" />

      <div className="flex flex-col gap-1 my-2">
        <button className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-zinc-300 hover:bg-white/5 font-normal text-sm transition-colors">
          <div className="flex items-center gap-5">
            <span className="w-5 h-5 flex items-center justify-center shrink-0">
              <img
                src="../../collections.svg"
                alt="Collections"
                className="w-full h-full object-contain"
              />
            </span>
            <span>Collections</span>
          </div>
          <span className="w-4 h-4 flex items-center justify-center text-zinc-400 shrink-0">
            <img
              src="../../Arrow.svg"
              alt="Arrow"
              className="w-full h-full object-contain"
            />
          </span>
        </button>

        <button className="flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-zinc-300 hover:bg-white/5 font-normal text-sm transition-colors">
          <div className="flex items-center gap-5">
            <span className="w-5 h-5 flex items-center justify-center shrink-0">
              <img
                src="../../Subscriptions.svg"
                alt="Subscriptions"
                className="w-full h-full object-contain"
              />
            </span>
            <span>Subscriptions</span>
          </div>
          <span className="w-4 h-4 flex items-center justify-center text-zinc-400 shrink-0">
            <img
              src="../../Arrow.svg"
              alt="Arrow"
              className="w-full h-full object-contain"
            />
          </span>
        </button>
      </div>

      <hr className="border-zinc-800 my-2" />
    </aside>
  );
};

export default Sidebar;
