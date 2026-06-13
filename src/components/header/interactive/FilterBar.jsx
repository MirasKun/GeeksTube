import { useState } from "react";

const FILTERS = [];

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState("Все");

  return (
      <div className="flex bg-[#0f0f0f] py-1 gap-3 overflow-x-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {FILTERS.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeFilter === filter
                  ? "bg-white text-black"
                  : "bg-[#C4E4FF14] text-white hover:bg-gray-600"
              }`}
            >
              {filter}
            </button>
          ))}
      </div>
  );
};

export default FilterBar;
