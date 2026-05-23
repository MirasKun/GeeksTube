import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSearchResults } from "../../api/search";

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!searchQuery.trim()) {
        setSuggestions([]);
        return;
      }
      setLoading(true);
      try {
        const res = await getSearchResults(searchQuery);
        setSuggestions(res.data?.items ?? []);
      } catch {
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const goToResults = (query) => {
    if (!query.trim()) return;
    setIsFocused(false);
    navigate(`/results?search_query=${encodeURIComponent(query.trim())}`);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") goToResults(searchQuery);
  };

  const handleSuggestionClick = (title) => {
    setSearchQuery(title);
    goToResults(title);
  };

  const handleClear = () => {
    setSearchQuery("");
    setSuggestions([]);
    setIsFocused(false);
  };

  const showDropdown =
    isFocused && searchQuery.trim() && suggestions.length > 0;

  return (
    <div className="relative flex items-center w-150">
      <div
        className={`flex items-center w-full border px-4 h-10 gap-1.5 transition-all ${
          showDropdown
            ? "border-[#FF0033] rounded-t-2xl rounded-b-none"
            : "border-gray-600 rounded-full"
        }`}
      >
        <button
          onMouseDown={() => goToResults(searchQuery)}
          className="shrink-0"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-gray-500 border-t-white rounded-full animate-spin" />
          ) : (
            <img src="/header/Search.svg" alt="search" />
          )}
        </button>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
          onKeyDown={handleKeyDown}
          placeholder="Search"
          className="w-full bg-transparent text-white outline-none"
        />

        {searchQuery && (
          <button
            onMouseDown={handleClear}
            className="text-gray-400 hover:text-white text-base shrink-0"
          >
            ✕
          </button>
        )}
        <button className="p-1 shrink-0">
          <img src="/header/Voice.svg" alt="" />
        </button>
      </div>

      {showDropdown && (
        <ul className="absolute top-10 left-0 right-0 bg-[#212121] border border-[#FF0033] border-t-0 rounded-b-2xl z-50 overflow-hidden shadow-2xl">
          {suggestions.slice(0, 10).map((item) => {
            const title = item.snippet?.title ?? "";
            const thumb = item.snippet?.thumbnails?.default?.url;
            const channel = item.snippet?.channelTitle ?? "";
            return (
              <li
                key={item.id?.videoId}
                onMouseDown={() => handleSuggestionClick(title)}
                className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-[#303030] transition-colors"
              >
                {thumb && (
                  <img
                    src={thumb}
                    alt=""
                    className="w-10 h-7 object-cover rounded shrink-0"
                  />
                )}
                <div className="flex flex-col min-w-0">
                  <span
                    className="text-gray-200 text-sm truncate"
                    dangerouslySetInnerHTML={{
                      __html: title.replace(
                        new RegExp(
                          `(${searchQuery.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`,
                          "gi",
                        ),
                        '<strong class="text-white">$1</strong>',
                      ),
                    }}
                  />
                  <span className="text-gray-500 text-xs truncate">
                    {channel}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
