export default function medusaError(error: any): Error {
  // In development mode, just log errors and return a generic error
  if (process.env.NODE_ENV === 'development') {
    console.warn("[DEV] Medusa error:", error)
    return new Error("Development mode - errors are expected")
  }

  // For production, return the most specific error message available
  const message = 
    error.response?.data?.message || 
    error.response?.data || 
    error.message || 
    'An unknown error occurred'
  
  throw new Error(message)
}
