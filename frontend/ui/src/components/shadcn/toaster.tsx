import { Toaster as SonnerToaster, type ToasterProps } from "sonner"
// eslint-disable-next-line react-refresh/only-export-components
export { toast } from "sonner"
export type Position = ToasterProps["position"]

export const Toaster: React.FC<{ position?: Position }> = ({
  position = "bottom-right",
}) => {
  return (
    <SonnerToaster
      position={position}
      closeButton
      duration={3000}
      richColors
      visibleToasts={5}
      toastOptions={{
        classNames: {
          toast: "text-gray-50 border-none",
          error: "bg-red-6",
          success: "bg-green-6",
          warning: "bg-yellow-6",
          info: "bg-blue-6",
        },
      }}
    />
  )
}
