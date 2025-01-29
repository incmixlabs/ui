import "@incmix/ui/styles/global.css"
// import "./instrument"
import { NuqsReactAdaptor } from "@incmix/ui/data-table"
import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import QueryProvider from "./query-client"

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <NuqsReactAdaptor>
        <App />
      </NuqsReactAdaptor>
    </QueryProvider>
  </React.StrictMode>
)
