import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSearchResultsTC } from "../store/thunks/spec/fetchSearchResults";
import SearchResultCard from "../components/videos/cards/SearchResultCard";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

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

  return (
    <div className="flex flex-col gap-3 max-w-4xl mx-auto py-4 min-h-screen px-4">
      {/* Динамический h1 для SEO */}
      <h1 className="text-xl font-bold text-white mb-2">
        Результаты поиска по запросу:{" "}
        <span className="text-red-500">«{query}»</span>
      </h1>

      {loading && (
        <Flex justify="center" align="center" className="py-20">
          <Spin
            indicator={
              <LoadingOutlined
                spin
                style={{ color: "#ffffff", fontSize: 32 }}
              />
            }
          />
        </Flex>
      )}

      {error && !loading && (
        <p className="text-red-400 p-4 text-center">Ошибка: {error}</p>
      )}

      {!loading && !error && searchResults.length === 0 && (
        <p className="text-gray-400 p-4 text-center">Ничего не найдено</p>
      )}

      {!loading &&
        !error &&
        searchResults.map((video) => (
          <SearchResultCard key={video.id?.videoId || video.id} video={video} />
        ))}
    </div>
  );
};

export default SearchResultsPage;
