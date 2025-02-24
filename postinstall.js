const rxdbPremium = process.env.RXDB_PREMIUM

if (!rxdbPremium) {
  console.error("RXDB_PREMIUM environment variable is not set")
  process.exit(1)
} else {
  console.log("RXDB_PREMIUM value:", rxdbPremium)
}
