export default function medusaError(error: any): never {
  // For publishable key errors in development, return a special error
  if (error.message?.includes('publishable key')) {
    throw new Error("[DEV] Medusa publishable key error - this is expected")
  }

  // For all other errors, return the most specific error message available
  const message = 
    error.response?.data?.message || 
    error.response?.data || 
    error.message || 
    'An unknown error occurred'
  
  throw new Error(`[${process.env.NODE_ENV?.toUpperCase() || 'UNKNOWN'}] ${message}`)
}
