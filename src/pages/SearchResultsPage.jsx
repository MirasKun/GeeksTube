import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResultsTC } from "../store/thunks/fetchSearchResults";
import SearchResultCard from "../components/videos/SearchResultCard";

const SearchResultsPage = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("search_query") ?? "";

  const { searchResults, loading, error } = useSelector(
    (s) => s.searchQuerySlice,
  );

  useEffect(() => {
    if (query.trim()) dispatch(fetchSearchResultsTC(query));
  }, [query, dispatch]);

  if (loading) return <p className="text-white p-4">Загрузка...</p>;
  if (error) return <p className="text-red-400 p-4">Ошибка: {error}</p>;
  if (!searchResults.length)
    return <p className="text-gray-400 p-4">Ничего не найдено</p>;

  return (
    <div className="flex flex-col gap-3 max-w-4xl mx-auto py-4">
      <p className="text-gray-400 text-sm mb-2">
        Результаты по запросу: <span className="text-white">«{query}»</span>
      </p>
      {searchResults.map((video) => (
        <SearchResultCard key={video.id?.videoId} video={video} />
      ))}
    </div>
  );
};

export default SearchResultsPage;
