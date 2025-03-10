export default function medusaError(error: any): Error {
  // For publishable key errors in development, just log and return a dummy error
  if (error.message?.includes('publishable key')) {
    console.warn("[DEV] Medusa publishable key error - this is expected")
    return new Error("Medusa publishable key error - safe to ignore in development")
  }

  // For all other errors, return the most specific error message available
  const message = 
    error.response?.data?.message || 
    error.response?.data || 
    error.message || 
    'An unknown error occurred'
  
  throw new Error(`[${process.env.NODE_ENV?.toUpperCase() || 'UNKNOWN'}] ${message}`)
}
