const fs = require("node:fs")
let rxdbPremium = process.env.RXDB_PREMIUM

// If not in env, try reading from .env file
if (!rxdbPremium && fs.existsSync(".env")) {
  const envContent = fs.readFileSync(".env", "utf8")
  const match = envContent.match(/RXDB_PREMIUM=(.+)/)
  if (match) {
    rxdbPremium = match[1]
  }
}

if (!rxdbPremium) {
  console.error(
    "RXDB_PREMIUM environment variable is not set in env or .env file"
  )
  process.exit(1)
} else {
  // Write the value to .env file
  fs.writeFileSync(".env", `RXDB_PREMIUM=${rxdbPremium}\n`)
  console.log(".env file created successfully")
}
