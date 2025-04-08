import type React from "react"
import { Box, Button, Flex, Heading, Tabs, Text } from "@/components/base"
import { commentsData } from "@/components/kanban-board/data"
import { Image, Paperclip, Smile } from "lucide-react"
import { useState } from "react"

function ProjectComments() {
  const [comment, setComment] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setComment("")
  }

  return (
    <>
      {/* comments & activity tabs */}
      <Box>
        <Tabs.Root defaultValue="comments">
          <Tabs.List className="gap-4" color="cyan">
            <Tabs.Trigger
              value="comments"
              className="inline-block cursor-pointer py-3 font-medium hover:bg-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary "
            >
              COMMENTS
            </Tabs.Trigger>
            <Tabs.Trigger
              value="activity"
              className="inline-block cursor-pointer py-3 font-medium hover:bg-transparent data-[state=active]:border-secondary data-[state=active]:text-secondary "
            >
              ACTIVITY
            </Tabs.Trigger>
          </Tabs.List>

          <Box pt="3">
            <Tabs.Content value="comments" className="py-4">
              <form
                onSubmit={handleSubmit}
                className="rounded-lg border border-gray-5 bg-gray-2 shadow-sm dark:bg-gray-4"
              >
                <Box className="p-2">
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Add Comment..."
                    className="min-h-[70px] w-full resize-none border-0 bg-gray-2 text-gray-12 text-sm placeholder-gray-400 focus:ring-0 dark:bg-gray-4"
                  />
                </Box>

                <Flex
                  className=" px-4 py-2 "
                  justify={"between"}
                  align={"center"}
                >
                  <Button
                    type="submit"
                    variant="solid"
                    className="rounded-md px-4 py-2 font-medium text-sm text-white transition-colors"
                    disabled={!comment.trim()}
                  >
                    Comment
                  </Button>
                  <Flex gap={"2"} align={"center"}>
                    <Button
                      type="button"
                      variant="soft"
                      className="h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-3 dark:hover:bg-gray-7"
                      aria-label="Attach file"
                    >
                      <Paperclip className="h-5 w-5 text-gray-12" />
                    </Button>
                    <Button
                      type="button"
                      variant="soft"
                      className="h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-3 dark:hover:bg-gray-7"
                      aria-label="Add emoji"
                    >
                      <Smile className="h-5 w-5 text-gray-12" />
                    </Button>
                    <Button
                      type="button"
                      variant="soft"
                      className="h-9 cursor-pointer rounded-full bg-transparent p-2 transition-colors hover:bg-gray-3 dark:hover:bg-gray-7"
                      aria-label="Upload image"
                    >
                      <Image className="h-5 w-5 text-gray-12" />
                    </Button>
                  </Flex>
                </Flex>
              </form>
              <Box className="space-y-4 py-4">
                {commentsData.map((comment) => (
                  <Flex key={comment.id} gap={"2"}>
                    <img
                      src={comment.user.avatar}
                      alt={comment.user.name}
                      className="h-10 w-10 flex-shrink-0 rounded-full object-cover"
                    />
                    <Box className="flex-1">
                      <Flex align={"center"} className="mb-1 gap-2">
                        <Heading
                          size={"3"}
                          className="font-medium text-gray-12"
                        >
                          {comment.user.name}
                        </Heading>
                        <Text as="span" className="text-gray-500 text-sm">
                          {comment.timestamp}
                        </Text>
                      </Flex>
                      <Text as="p" className="whitespace-pre-line text-gray-11">
                        {comment.text}
                      </Text>

                      {comment.images && (
                        <Flex className="mt-3" gap={"2"}>
                          {comment.images.map((image, index) => (
                            <Box
                              key={`${comment.id}-image-${image}`}
                              className="group relative"
                            >
                              <img
                                src={image}
                                alt={`Attachment ${index + 1}`}
                                className="h-16 w-16 rounded-lg object-cover"
                              />
                              {index === 3 &&
                                (comment.images?.length ?? 0) > 3 && (
                                  <Flex
                                    align={"center"}
                                    justify={"center"}
                                    className="absolute inset-0 rounded-lg bg-black/40"
                                  >
                                    <Text className="font-medium text-white">
                                      +3
                                    </Text>
                                  </Flex>
                                )}
                            </Box>
                          ))}
                        </Flex>
                      )}
                    </Box>
                  </Flex>
                ))}
              </Box>
            </Tabs.Content>
            <Tabs.Content value="activity">
              <Text>Access and update your documents.</Text>
            </Tabs.Content>
          </Box>
        </Tabs.Root>
      </Box>
    </>
  )
}

export default ProjectComments
