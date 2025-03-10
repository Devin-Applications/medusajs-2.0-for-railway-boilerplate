"use client"

import { useEffect, useState } from "react"
import { Text } from "@medusajs/ui"
import { STORE_NAME } from "@lib/constants"
import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ContactForm from "@modules/common/components/contact-form"
import FooterContact from "../../components/footer-contact"

export default function Footer() {
  const [collections, setCollections] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [collectionsData, categoriesData] = await Promise.all([
          getCollectionsList(),
          getCategoriesList()
        ])
        
        setCollections(collectionsData.collections?.slice(0, 6) || [])
        setCategories(categoriesData.product_categories?.slice(0, 6) || [])
      } catch (error) {
        console.error("Error fetching footer data:", error)
      }
    }
    
    fetchData()
  }, [])

  return (
    <footer className="border-t border-ui-border-base">
      <div className="content-container flex flex-col w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-16 bg-white">
          <div className="flex flex-col">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-bold text-grey-90 hover:text-grey-80 uppercase mb-6"
            >
              {STORE_NAME}
            </LocalizedClientLink>
            
            <div className="flex flex-col gap-4">
              <FooterContact />
              <div className="flex items-start">
                <span className="w-8 h-8 flex items-center justify-center bg-grey-10 rounded-full mr-3">📍</span>
                <address className="text-grey-60 not-italic">
                  87-40 121 street<br />
                  Richmond Hill, NY 11418
                </address>
              </div>
            </div>
          </div>
          
          {collections.length > 0 && (
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-grey-90 mb-6">Collections</h3>
              <ul className="grid grid-cols-1 gap-3">
                {collections.map((collection) => (
                  <li key={collection.id}>
                    <LocalizedClientLink
                      href={`/collections/${collection.handle}`}
                      className="text-grey-50 hover:text-grey-90 transition-colors"
                    >
                      {collection.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div className="bg-grey-5 p-6 rounded-lg shadow-sm">
            <ContactForm />
          </div>
        </div>
        
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted border-t border-ui-border-base pt-6">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
