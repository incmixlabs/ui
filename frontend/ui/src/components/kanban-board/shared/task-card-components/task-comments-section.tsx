// task-card-components/task-comments-section.tsx
import { Send, MessageSquareText } from "lucide-react"
import type { TaskCommentsSectionProps, Comment } from "./utils/types"

export function TaskCommentsSection({
  currentTask,
  newComment,
  onNewCommentChange,
  onAddComment,
}: TaskCommentsSectionProps) {
  const handleAddComment = () => {
    onAddComment()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) handleAddComment()
  }

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide">
        Comments ({currentTask.commentsCount || 0})
      </h3>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {currentTask.comments && currentTask.comments.length > 0 ? (
          currentTask.comments.map((comment: Comment) => (
            <div
              key={comment.id}
              className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs overflow-hidden">
                  {comment.createdBy.image ? (
                    <img
                      src={comment.createdBy.image}
                      alt={comment.createdBy.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    comment.createdBy.name.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">{comment.createdBy.name}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString()} at{" "}
                    {new Date(comment.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{comment.content}</p>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            <MessageSquareText className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">No comments yet</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 pt-2 border-t border-gray-200 dark:border-gray-700">
        <input
          value={newComment}
          onChange={(e) => onNewCommentChange(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onKeyDown={handleKeyDown}
        />
        <button 
          onClick={handleAddComment} 
          disabled={!newComment.trim()}
          className="p-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100 transition-colors"
        >
          <Send className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}