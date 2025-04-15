export function SidebarErrorFallback({ message }: { message: string }) {
  return (
    <>
      <div className="flex h-screen items-center justify-center p-4 text-red-500 ">
        Failed to load {message}
      </div>
    </>
  )
}
