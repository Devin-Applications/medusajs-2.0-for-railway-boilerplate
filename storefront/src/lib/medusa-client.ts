import Medusa from "@medusajs/medusa-js"

// Initialize the Medusa client in development mode with minimal configuration
const client = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  maxRetries: 3,
  publishableApiKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY
})

export default client
