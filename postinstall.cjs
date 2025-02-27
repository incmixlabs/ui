const fs = require("node:fs")
let rxdbPremium = process.env.RXDB_PREMIUM

// If not in env, try reading from .env file
if (!rxdbPremium && fs.existsSync(".env")) {
  const envContent = fs.readFileSync(".env", "utf8")
  const match = envContent.match(/RXDB_PREMIUM=(.+)/)
  if (match) {
    rxdbPremium = match[1]
    console.log("RXDB_PREMIUM value found in .env file, skipping update")
    process.exit(0)
  }
}

if (!rxdbPremium) {
  console.error(
    "RXDB_PREMIUM environment variable is not set in env or .env file"
  )
  process.exit(1)
} else {
  // Read existing .env content
  let envContent = ""
  if (fs.existsSync(".env")) {
    envContent = fs.readFileSync(".env", "utf8")
  }

  // Replace or append RXDB_PREMIUM
  if (envContent.match(/RXDB_PREMIUM=.*/)) {
    envContent = envContent.replace(
      /RXDB_PREMIUM=.*/,
      `RXDB_PREMIUM=${rxdbPremium}`
    )
  } else {
    envContent += `${envContent && !envContent.endsWith("\n") ? "\n" : ""}RXDB_PREMIUM=${rxdbPremium}\n`
  }

  // Write back to .env file
  fs.writeFileSync(".env", envContent)
  console.log("RXDB_PREMIUM value updated in .env file")
}