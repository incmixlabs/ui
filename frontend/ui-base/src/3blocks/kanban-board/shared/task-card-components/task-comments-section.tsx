import { Button } from "@/base"
// task-card-components/task-comments-section.tsx
import { MessageSquareText, Send } from "lucide-react"
import type { Comment, TaskCommentsSectionProps } from "./utils/types"

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
      <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide dark:text-gray-100">
        Comments ({currentTask.comments?.length || 0})
      </h3>

      <div className="max-h-80 space-y-4 overflow-y-auto">
        {currentTask.comments && currentTask.comments.length > 0 ? (
          currentTask.comments.map((comment: Comment) => (
            <div
              key={comment.id}
              className="rounded-lg border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-900"
            >
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-blue-500 text-white text-xs">
                  {comment.createdBy.image ? (
                    <img
                      src={comment.createdBy.image}
                      alt={comment.createdBy.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    comment.createdBy.name.substring(0, 2).toUpperCase()
                  )}
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {comment.createdBy.name}
                  </p>
                  <p className="text-gray-500 text-xs">
                    {new Date(comment.createdAt).toLocaleDateString()} at{" "}
                    {new Date(comment.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
              <p className="whitespace-pre-wrap text-gray-700 text-sm dark:text-gray-300">
                {comment.content}
              </p>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-gray-500">
            <MessageSquareText className="mx-auto mb-2 h-8 w-8 opacity-50" />
            <p className="text-sm">No comments yet</p>
          </div>
        )}
      </div>

      <div className="flex gap-2 border-gray-200 border-t pt-2 dark:border-gray-700">
        <input
          value={newComment}
          onChange={(e) => onNewCommentChange(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 rounded-md border border-gray-200 bg-white px-3 py-2 text-gray-900 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-900 dark:text-white"
          onKeyDown={handleKeyDown}
        />
        <Button
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          className="rounded-md bg-gray-900 p-2 text-white transition-colors hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
