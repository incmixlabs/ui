/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BFF_API_URL: string

}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
