import { MetadataRoute } from 'next'
import { getProductsList } from "@lib/data/products"
import { getCollectionsList } from "@lib/data/collections"
import { getCategoriesList } from "@lib/data/categories"
import { listRegions } from "@lib/data/regions"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://jbsdumpster.com'
  
  // Get all regions
  const regions = await listRegions()
  const countryCodes = regions
    ?.map((r) => r.countries?.map((c) => c.iso_2))
    .flat()
    .filter(Boolean) as string[]
  
  if (!countryCodes || countryCodes.length === 0) {
    return []
  }
  
  // Use first country code for fetching data
  const countryCode = countryCodes[0]
  
  // Get products, collections, and categories
  const { response: productsResponse } = await getProductsList({ countryCode })
  const { collections } = await getCollectionsList()
  const { product_categories } = await getCategoriesList()
  
  // Create sitemap entries
  const sitemapEntries: MetadataRoute.Sitemap = []
  
  // Add home pages for each country
  countryCodes.forEach(code => {
    sitemapEntries.push({
      url: `${baseUrl}/${code}`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    })
  })
  
  // Add product pages
  productsResponse.products.forEach(product => {
    countryCodes.forEach(code => {
      sitemapEntries.push({
        url: `${baseUrl}/${code}/products/${product.handle}`,
        lastModified: new Date(product.updated_at),
        changeFrequency: 'weekly',
        priority: 0.8,
      })
    })
  })
  
  // Add collection pages
  collections.forEach(collection => {
    countryCodes.forEach(code => {
      sitemapEntries.push({
        url: `${baseUrl}/${code}/collections/${collection.handle}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })
  })
  
  // Add category pages
  product_categories.forEach(category => {
    countryCodes.forEach(code => {
      sitemapEntries.push({
        url: `${baseUrl}/${code}/categories/${category.handle}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      })
    })
  })
  
  return sitemapEntries
}
