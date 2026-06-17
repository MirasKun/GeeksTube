import { useDispatch, useSelector } from "react-redux";
import { VIDEO_CATEGORY_FILTERS } from "../../../constants/videoCategories";
import { setActiveCategory } from "../../../store/slices/general/categoryVideosSlice";

const FilterBar = () => {
  const dispatch = useDispatch();
  const activeCategory = useSelector(
    (state) => state.categoryVideosSlice.activeCategory,
  );

  const handleCategoryClick = (categoryKey) => {
    dispatch(setActiveCategory(categoryKey));
  };

  return (
      <div className="flex bg-[#0f0f0f] py-1 gap-3 overflow-x-auto [ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {VIDEO_CATEGORY_FILTERS.map((filter) => (
            <button
              key={filter.key}
              onClick={() => handleCategoryClick(filter.key)}
              className={`px-3 py-1 rounded-lg transition-colors ${
                activeCategory === filter.key
                  ? "bg-white text-black"
                  : "bg-[#C4E4FF14] text-white hover:bg-gray-600"
              }`}
            >
              {filter.label}
            </button>
          ))}
      </div>
  );
};

export default FilterBar;
