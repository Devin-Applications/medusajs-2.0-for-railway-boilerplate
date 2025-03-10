import { getCategoriesList } from "@lib/data/categories"
import { getCollectionsList } from "@lib/data/collections"
import { Text, clx } from "@medusajs/ui"
import { STORE_NAME } from "@lib/constants"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import ContactForm from "@modules/common/components/contact-form"

export default async function Footer() {
  const { collections } = await getCollectionsList()
  const { product_categories } = await getCategoriesList()

  // Slice to show only first 6 items
  const displayCollections = collections?.slice(0, 6) || []
  const displayCategories = product_categories?.slice(0, 6) || []

  return (
    <footer className="border-t border-ui-border-base">
      <div className="content-container flex flex-col w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 py-16 bg-white">
          <div className="flex flex-col lg:col-span-4">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-bold text-grey-90 hover:text-grey-80 uppercase mb-6"
            >
              {STORE_NAME}
            </LocalizedClientLink>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center">
                <span className="w-8 h-8 flex items-center justify-center bg-grey-10 rounded-full mr-3">📞</span>
                <a href="tel:5165151951" className="text-grey-60 hover:text-grey-90 font-medium transition-colors">
                  (516) 515-1951
                </a>
              </div>
              <div className="flex items-start">
                <span className="w-8 h-8 flex items-center justify-center bg-grey-10 rounded-full mr-3">📍</span>
                <address className="text-grey-60 not-italic">
                  87-40 121 street<br />
                  Richmond Hill, NY 11418
                </address>
              </div>
            </div>
          </div>
          
          {displayCollections.length > 0 && (
            <div className="flex flex-col">
              <h3 className="text-xl font-semibold text-grey-90 mb-6">Collections</h3>
              <ul className="grid grid-cols-1 gap-3">
                {displayCollections.map((collection) => (
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
          
          <div className="bg-white p-4 md:p-8 lg:p-10 rounded-lg shadow-lg border border-gray-300 lg:col-span-8">
            <ContactForm inFooter={true} />
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
