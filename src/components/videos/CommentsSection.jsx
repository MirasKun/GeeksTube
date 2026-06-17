import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCommentsTC,
  fetchMoreCommentsTC,
  postCommentTC,
} from "../../store/thunks/spec/video/commentsThunks";
import {
  clearComments,
  addLocalComment,
} from "../../store/slices/spec/commentsSlice";
import { formatCount } from "../../lib/formatYouTube";
import { loginWithGoogle } from "../../store/thunks/auth";
import { message } from "antd";
import CommentItem from "./CommentItem";


const CommentsSection = ({ videoId, initialCommentCount }) => {
  const dispatch = useDispatch();
  const { comments, loading, posting, loadingMore, nextPageToken } = useSelector(
    (s) => s.commentsSlice,
  );
  const { user } = useSelector((s) => s.authSlice);

  const [commentText, setCommentText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const inputRef = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    if (videoId) {
      dispatch(clearComments());
      dispatch(fetchCommentsTC(videoId));
    }
  }, [videoId, dispatch]);

  useEffect(() => {
    const node = loaderRef.current;
    if (!node || !videoId) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && nextPageToken && !loadingMore) {
          dispatch(fetchMoreCommentsTC({ videoId, pageToken: nextPageToken }));
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0,
      },
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [dispatch, nextPageToken, loadingMore, videoId, comments.length]);

  const handleFocus = () => {
    if (!user) {
      message.info("Пожалуйста, войдите в аккаунт, чтобы оставить комментарий.");
      loginWithGoogle().catch((e) => console.error(e));
      return;
    }
    setIsFocused(true);
  };

  const handleCancel = () => {
    setCommentText("");
    setIsFocused(false);
    if (inputRef.current) {
      inputRef.current.blur();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!commentText.trim() || posting) return;

    const trimmedText = commentText.trim();

    try {
      const resultAction = await dispatch(
        postCommentTC({ videoId, text: trimmedText })
      );

      if (postCommentTC.rejected.match(resultAction)) {
        console.warn("YouTube API post failed, using local simulation fallback.");
        const simulatedComment = {
          id: `local-${Date.now()}`,
          snippet: {
            videoId,
            topLevelComment: {
              id: `local-comment-${Date.now()}`,
              snippet: {
                authorDisplayName: user.displayName || user.email || "Вы",
                authorProfileImageUrl: user.photoURL || "/Watch/default-avatar.png",
                textDisplay: trimmedText,
                textOriginal: trimmedText,
                likeCount: 0,
                publishedAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
              },
            },
            totalReplyCount: 0,
            isPublic: true,
          },
        };
        dispatch(addLocalComment(simulatedComment));
      } else {
        message.success("Комментарий опубликован!");
      }

      setCommentText("");
      setIsFocused(false);
    } catch (err) {
      console.error(err);
    }
  };


  const displayCount = comments.length > 0 ? comments.length : (initialCommentCount || 0);

  return (
    <div className="mt-4 sm:mt-6 text-white border-t border-zinc-800 pt-4 sm:pt-6">
      <div className="flex items-center gap-8 mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-bold font-sans">
          {formatCount(displayCount)} комментариев
        </h2>
      </div>

      <div className="flex gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
          {user && user.photoURL ? (
            <img
              src={user.photoURL}
              alt="user avatar"
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-6 h-6 text-zinc-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          )}
        </div>
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              placeholder="Оставьте комментарий..."
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              onFocus={handleFocus}
              className="w-full bg-transparent text-white border-b border-zinc-700 py-2 focus:outline-none focus:border-white transition-colors text-xs sm:text-sm"
            />
          </div>

          {isFocused && (
            <div className="flex justify-end gap-3 mt-3 animate-fade-in">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-semibold hover:bg-zinc-800 rounded-full transition-colors"
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={!commentText.trim() || posting}
                className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                  commentText.trim() && !posting
                    ? "bg-blue-500 text-white hover:bg-blue-600"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                }`}
              >
                {posting ? "Публикация..." : "Оставить комментарий"}
              </button>
            </div>
          )}
        </form>
      </div>


      {loading ? (
        <div className="flex flex-col gap-4 py-8 items-center justify-center">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-zinc-400 text-sm">Загрузка комментариев...</span>
        </div>
      ) : comments.length === 0 ? (
        <div className="text-center py-8 text-zinc-500">
          Комментариев пока нет. Будьте первыми!
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {comments.map((thread) => (
            <CommentItem key={thread.id} thread={thread} />
          ))}

          <div ref={loaderRef} className="flex justify-center py-4">
            {loadingMore && (
              <div className="flex items-center gap-3 text-zinc-400 text-sm">
                <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                <span>Загрузка еще комментариев...</span>
              </div>
            )}
            {!loadingMore && !nextPageToken && comments.length > 0 && (
              <span className="text-zinc-500 text-sm">Все комментарии загружены</span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsSection;
