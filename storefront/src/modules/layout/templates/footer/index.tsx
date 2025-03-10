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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-12">
          <div>
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus text-ui-fg-subtle hover:text-ui-fg-base uppercase"
            >
              {STORE_NAME}
            </LocalizedClientLink>
            
            <div className="flex flex-col mt-6">
              <div className="flex items-center mb-2">
                <span className="mr-2">📞</span>
                <a href="tel:5165151951" className="text-ui-fg-subtle hover:text-ui-fg-base">
                  (516) 515-1951
                </a>
              </div>
              <div className="flex items-start mb-2">
                <span className="mr-2">📍</span>
                <address className="text-ui-fg-subtle not-italic">
                  87-40 121 street<br />
                  Richmond Hill, NY 11418
                </address>
              </div>
            </div>
          </div>
          
          {displayCollections.length > 0 && (
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">Collections</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                {displayCollections.map((collection) => (
                  <li key={collection.id}>
                    <LocalizedClientLink
                      href={`/collections/${collection.handle}`}
                      className="hover:text-ui-fg-base"
                    >
                      {collection.title}
                    </LocalizedClientLink>
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          <div>
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
