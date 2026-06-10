import { memo } from "react";
import { useDispatch } from "react-redux";
import {
  toggleLikeComment,
  toggleDislikeComment,
} from "../../store/slices/spec/commentsSlice";
import { formatCount } from "../../lib/formatYouTube";

const CommentItem = memo(({ thread }) => {
  const dispatch = useDispatch();
  const comment = thread?.snippet?.topLevelComment?.snippet;
  if (!comment) return null;
  const topLevelCommentId = thread.snippet?.topLevelComment?.id || thread.id;

  return (
    <div className="flex gap-4 group">
      <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center overflow-hidden shrink-0">
        {comment.authorProfileImageUrl ? (
          <img
            src={comment.authorProfileImageUrl}
            alt={comment.authorDisplayName}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "/Watch/default-avatar.png";
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-blue-600 text-white font-bold uppercase">
            {comment.authorDisplayName?.[0] || "U"}
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="text-white text-xs font-bold font-sans">
            {comment.authorDisplayName}
          </span>
        </div>

        <p className="text-white text-sm leading-relaxed whitespace-pre-wrap font-sans">
          {comment.textOriginal || comment.textDisplay}
        </p>

        <div className="flex items-center gap-1 mt-1">
          <button
            onClick={() =>
              dispatch(
                toggleLikeComment({
                  threadId: thread.id,
                  commentId: topLevelCommentId,
                })
              )
            }
            className={`p-1.5 rounded-full hover:bg-zinc-800 flex items-center gap-1.5 transition-colors ${
              comment.userLiked
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <svg
              className="w-4.5 h-4.5"
              fill={comment.userLiked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            {(comment.likeCount ?? 0) > 0 && (
              <span className="text-xs">{formatCount(comment.likeCount)}</span>
            )}
          </button>

          <button
            onClick={() =>
              dispatch(
                toggleDislikeComment({
                  threadId: thread.id,
                  commentId: topLevelCommentId,
                })
              )
            }
            className={`p-1.5 rounded-full hover:bg-zinc-800 flex items-center transition-colors ${
              comment.userDisliked
                ? "text-white"
                : "text-zinc-400 hover:text-white"
            }`}
          >
            <svg
              className="w-4.5 h-4.5"
              fill={comment.userDisliked ? "currentColor" : "none"}
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.736 3h4.018c.163 0 .326.02.485.06L17 4m-7 10v9a2 2 0 002 2h.095c.5 0 .905-.405.905-.905 0-.714.211-1.412.608-2.006L17 13V4m-7 10h2m5-10h2a2 2 0 012 2v6a2 2 0 01-2 2h-2.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

CommentItem.displayName = "CommentItem";

export default CommentItem;
