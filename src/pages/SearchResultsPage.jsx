import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Flex, Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
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
    if (!query.trim()) return;
    dispatch(fetchSearchResultsTC(query));
  }, [query, dispatch]);

  if (!query.trim()) {
    return (
      <p className="p-4 text-gray-400">Введите запрос в строке поиска выше</p>
    );
  }

  if (loading) {
    return (
      <Flex justify="center" className="min-h-[40vh]">
        <Spin
          indicator={<LoadingOutlined spin style={{ color: "#ffffff" }} />}
        />
      </Flex>
    );
  }

  if (error) {
    return <p className="p-4 text-red-400">Ошибка: {error}</p>;
  }

  if (!searchResults.length) {
    return <p className="p-4 text-gray-400">Ничего не найдено</p>;
  }

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-3 py-4">
      <p className="mb-2 text-sm text-gray-400">
        Результаты по запросу: <span className="text-white">«{query}»</span>
      </p>
      {searchResults.map((video) => (
        <SearchResultCard
          key={video.id?.videoId ?? video.id}
          video={video}
        />
      ))}
    </div>
  );
};

export default SearchResultsPage;
