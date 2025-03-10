import { STORE_NAME } from "@lib/constants"

export type DumpsterService = {
  name: string
  description: string
  price?: string
  image?: string
}

export const createOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": STORE_NAME,
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://jbsdumpster.com",
    "logo": `${process.env.NEXT_PUBLIC_BASE_URL || "https://jbsdumpster.com"}/images/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "(516) 515-1951",
      "contactType": "customer service",
      "areaServed": ["Queens", "Manhattan", "Brooklyn", "Bronx"],
      "availableLanguage": "English"
    },
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001", // Replace with actual postal code
      "addressCountry": "US"
    },
    "sameAs": [
      "https://facebook.com/jbsbuilderlic", // Replace with actual social links
      "https://instagram.com/jbsbuilderlic",
      "https://twitter.com/jbsbuilderlic"
    ]
  }
}

export const createServiceSchema = (service: DumpsterService) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": `${service.name} Dumpster Rental - ${STORE_NAME}`,
    "description": service.description,
    "provider": {
      "@type": "Organization",
      "name": STORE_NAME
    },
    "areaServed": {
      "@type": "City",
      "name": "New York City",
      "containsPlace": [
        {
          "@type": "Borough",
          "name": "Queens"
        },
        {
          "@type": "Borough",
          "name": "Manhattan"
        },
        {
          "@type": "Borough",
          "name": "Brooklyn"
        },
        {
          "@type": "Borough",
          "name": "Bronx"
        }
      ]
    },
    "offers": {
      "@type": "Offer",
      "price": service.price || "Call for pricing",
      "priceCurrency": "USD"
    },
    "image": service.image
  }
}

export const createLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": STORE_NAME,
    "image": `${process.env.NEXT_PUBLIC_BASE_URL || "https://jbsdumpster.com"}/images/logo.png`,
    "priceRange": "$$$",
    "telephone": "(516) 515-1951",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Main St", // Replace with actual address
      "addressLocality": "New York",
      "addressRegion": "NY",
      "postalCode": "10001", // Replace with actual postal code
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 40.6996338,
      "longitude": -73.8290081
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Saturday"],
        "opens": "09:00",
        "closes": "17:00"
      }
    ],
    "url": process.env.NEXT_PUBLIC_BASE_URL || "https://jbsdumpster.com"
  }
}
