export default function medusaError(error: any): never {
  // In development mode, ignore all Medusa-related errors
  if (process.env.NODE_ENV === 'development') {
    console.warn("Development mode: Ignoring Medusa error", error)
    process.exit(0) as never
    return process.exit(0) as never // TypeScript needs this
  }
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    const u = new URL(error.config.url, error.config.baseURL)
    console.error("Resource:", u.toString())
    console.error("Response data:", error.response.data)
    console.error("Status code:", error.response.status)
    console.error("Headers:", error.response.headers)

    // Extracting the error message from the response data
    const message = error.response.data.message || error.response.data

    throw new Error(message.charAt(0).toUpperCase() + message.slice(1) + ".")
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error("No response received: " + error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    if (process.env.NODE_ENV === 'development' && error.message.includes('publishable key')) {
      console.warn("Skipping publishable key error in development")
      return process.exit(0) as never
    }
    throw new Error("Error setting up the request: " + error.message)
  }
}
