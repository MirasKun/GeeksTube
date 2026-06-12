import { useState } from "react";

const FILTERS = ["Все", "Музыка", "Новое для вас"];

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState("Все");

  return (
      <div className="flex bg-[#0f0f0f] py-1 gap-3">
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
