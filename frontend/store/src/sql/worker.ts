import { PGlite } from "@electric-sql/pglite"
import { worker } from "@electric-sql/pglite/worker"

worker({
  init(options) {
    // biome-ignore lint/correctness/noUnusedVariables: <explanation>
    const meta = options.meta
    // Do something with additional metadata.
    // or even run your own code in the leader along side the PGlite
    return Promise.resolve(
      new PGlite({
        dataDir: options.dataDir,
      })
    )
  },
})
