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
            <a href="tel:5165151951" className="hidden small:flex items-center gap-4 text-grey-90 hover:text-orange-500 transition-all bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 px-8 py-4 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105">
              <div className="bg-white rounded-full p-2.5">
                <Phone className="w-6 h-6 text-orange-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm uppercase tracking-wider text-white font-medium">Call Us Now</span>
                <span className="text-lg font-bold text-white">(516) 515-1951</span>
              </div>
            </a>
            <a href="tel:5165151951" className="small:hidden flex items-center text-grey-90 hover:text-orange-500 transition-all px-4">
              <Phone className="w-6 h-6 text-orange-500 mr-2" />
              <span className="font-medium">(516) 515-1951</span>
            </a>
          </div>
          <div className="flex-1 flex items-center justify-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-orange-500 uppercase font-bold tracking-wide transition-all transform hover:scale-[1.02]"
              data-testid="nav-store-link"
            >
              {STORE_NAME}
            </LocalizedClientLink>
          </div>

          <div className="flex items-center gap-x-6 h-full justify-end">
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
