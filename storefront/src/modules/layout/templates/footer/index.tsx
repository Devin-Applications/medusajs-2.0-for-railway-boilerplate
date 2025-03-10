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
        <div className="flex flex-col gap-y-6 xsmall:flex-row items-start justify-between py-12">
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
          
          <div className="text-small-regular gap-10 md:gap-x-16 grid grid-cols-1 sm:grid-cols-2">
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
            {displayCategories.length > 0 && (
              <div className="flex flex-col gap-y-2">
                <span className="txt-small-plus txt-ui-fg-base">Categories</span>
                <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                  {displayCategories.map((category) => (
                    <li key={category.id}>
                      <LocalizedClientLink
                        href={`/categories/${category.handle}`}
                        className="hover:text-ui-fg-base"
                      >
                        {category.name}
                      </LocalizedClientLink>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="flex flex-col gap-y-2">
              <span className="txt-small-plus txt-ui-fg-base">Services</span>
              <ul className="grid grid-cols-1 gap-y-2 text-ui-fg-subtle txt-small">
                <li>
                  <LocalizedClientLink
                    href="/services/10-yard"
                    className="hover:text-ui-fg-base"
                  >
                    10' Dumpster Rental
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/services/15-yard"
                    className="hover:text-ui-fg-base"
                  >
                    15' Dumpster Rental
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/services/20-yard"
                    className="hover:text-ui-fg-base"
                  >
                    20' Dumpster Rental
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/services/30-yard"
                    className="hover:text-ui-fg-base"
                  >
                    30' Dumpster Rental
                  </LocalizedClientLink>
                </li>
                <li>
                  <LocalizedClientLink
                    href="/services/40-yard"
                    className="hover:text-ui-fg-base"
                  >
                    40' Dumpster Rental
                  </LocalizedClientLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="py-12 border-t border-ui-border-base">
          <ContactForm />
        </div>
        
        <div className="flex w-full mb-16 justify-between text-ui-fg-muted">
          <Text className="txt-compact-small">
            © {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
          </Text>
        </div>
      </div>
    </footer>
  )
}
