import { Suspense } from "react"
import { STORE_NAME } from "@lib/constants"
import { Phone } from "@medusajs/icons"

import LocalizedClientLink from "@modules/common/components/localized-client-link"
import CartButton from "@modules/layout/components/cart-button"

export default async function Nav() {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base shadow-sm">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-orange-500 uppercase font-bold tracking-wide transition-all transform hover:scale-[1.02]"
              data-testid="nav-store-link"
            >
              {STORE_NAME}
            </LocalizedClientLink>
          </div>
          <div className="hidden small:flex items-center ml-6">
            <a href="tel:5165151951" className="flex items-center text-grey-60 hover:text-orange-500 transition-all bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-full shadow-sm hover:shadow-md">
              <Phone className="w-5 h-5 mr-2 text-orange-500" />
              <span className="font-semibold">Call Us: (516) 515-1951</span>
            </a>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="text-grey-60 hover:text-orange-500 transition-colors"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="text-grey-60 hover:text-orange-500 transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-grey-60 hover:text-orange-500 transition-all flex gap-2 transform hover:scale-[1.02]"
                  href="/cart"
                  data-testid="nav-cart-link"
                >
                  Cart (0)
                </LocalizedClientLink>
              }
            >
              <CartButton />
            </Suspense>
          </div>
        </nav>
      </header>
    </div>
  )
}
