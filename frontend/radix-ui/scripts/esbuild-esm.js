import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import esbuild from "esbuild"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const pkg = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../package.json"), "utf-8")
)

const dir = "dist/esm"

/** @type {import('esbuild').BuildOptions} */
const options = {
  entryPoints: ["src/**/*.ts*"],
  outdir: dir,
  format: "esm",
  target: "es2020",
  sourcemap: true,
  minify: true,
}

// Check if "watch=true" flag is passed
if (process.argv[2]) {
  const [key, value] = process.argv[2].split("=")
  if (key === "watch" && value === "true") {
    const ctx = await esbuild.context(options)
    await ctx.watch()
  }
}

esbuild.build(options).catch(() => process.exit(1))

// Create a package.json file in the dist/esm directory with "type": "module" field
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}
fs.writeFileSync(
  path.join(dir, "package.json"),
  `${JSON.stringify({ type: "module", sideEffects: pkg.sideEffects }, null, 2)}\n`,
  "utf-8"
)
