// Area-specific phone numbers and pincode ranges for different boroughs
export const AREA_PHONE_NUMBERS = {
  "": "(516) 515-1951", // Default phone number
  "Queens": "(516) 515-1951",
  "Manhattan": "(212) 555-1234", // Replace with actual Manhattan phone number
  "Brooklyn": "(718) 888-7777",  // Replace with actual Brooklyn phone number
  "Bronx": "(347) 222-3333"      // Replace with actual Bronx phone number
} as const

// Pincode ranges for each area
export const AREA_PINCODES = {
  "Queens": {
    ranges: [[11001, 11499], [11690, 11699]],
    phone: AREA_PHONE_NUMBERS["Queens"]
  },
  "Manhattan": {
    ranges: [[10001, 10299]],
    phone: AREA_PHONE_NUMBERS["Manhattan"]
  },
  "Brooklyn": {
    ranges: [[11201, 11299]],
    phone: AREA_PHONE_NUMBERS["Brooklyn"]
  },
  "Bronx": {
    ranges: [[10401, 10499]],
    phone: AREA_PHONE_NUMBERS["Bronx"]
  }
} as const

// Service areas for dropdown selection
export const SERVICE_AREAS = [
  { value: "", label: "Select Your Area" },
  { value: "Queens", label: "Queens" },
  { value: "Manhattan", label: "Manhattan" },
  { value: "Brooklyn", label: "Brooklyn" },
  { value: "Bronx", label: "Bronx" }
] as const

export type ServiceArea = keyof typeof AREA_PHONE_NUMBERS

// Helper function to get area from pincode
export function getAreaFromPincode(pincode: string): ServiceArea | "" {
  const pin = parseInt(pincode, 10)
  if (isNaN(pin)) return ""
  
  for (const [area, { ranges }] of Object.entries(AREA_PINCODES)) {
    for (const [min, max] of ranges) {
      if (pin >= min && pin <= max) {
        return area as ServiceArea
      }
    }
  }
  
  return ""
}
