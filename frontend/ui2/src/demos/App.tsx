import { Theme } from "@radix-ui/themes"
import { RouterProvider } from "@tanstack/react-router"
import { router } from "./router"
import "./../style/global.css"

function App() {
  return (
    <Theme
      accentColor="indigo"
      grayColor="slate"
      panelBackground="solid"
      scaling="100%"
      radius="large"
      appearance={"light"}
    >
      <RouterProvider router={router} />
    </Theme>
  )
}

export default App
