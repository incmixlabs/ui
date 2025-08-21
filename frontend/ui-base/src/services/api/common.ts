export async function throwError(resp: Response) {
  let errorData = "Unknown error"
  try {
    errorData = await resp.text()
  } catch (e) {
    console.error("Failed to read error response:", e)
  }
  throw new Error(`Failed to fetch: ${resp.status} - ${errorData}`)
}
