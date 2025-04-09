/* eslint-disable react-refresh/only-export-components */
import { Toaster as SonnerToaster, type ToasterProps } from "sonner"
export { toast } from "sonner"
type Position = ToasterProps["position"]

export const Toaster: React.FC<{ position?: Position }> = ({
  position = "bottom-right",
}) => {
  return (
    <SonnerToaster
      position={position}
      closeButton
      duration={3000}
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
