const fs = require("node:fs")
const rxdbPremium = process.env.RXDB_PREMIUM

if (!rxdbPremium) {
  console.error("RXDB_PREMIUM environment variable is not set")
  process.exit(1)
} else {
  // Write the value to .env file
  fs.writeFileSync(".env", `RXDB_PREMIUM=${rxdbPremium}\n`)
  console.log(".env file created successfully")
}
