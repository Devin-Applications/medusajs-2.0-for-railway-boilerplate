"use client"

import React, { Suspense } from "react"
import { STORE_NAME } from "../../../../lib/constants"
import dynamic from "next/dynamic"
import { StoreRegion } from "@medusajs/types"
import LocalizedClientLink from "../../../common/components/localized-client-link"
import CartButton from "../cart-button"
import SideMenu from "../side-menu"

const AreaSelector = dynamic(() => import("../area-selector"), { 
  ssr: false,
  loading: () => <div className="h-6 w-32 bg-gray-100 animate-pulse rounded"></div>
})

const NavContent = ({ regions }: { regions: StoreRegion[] }) => {
  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 mx-auto border-b duration-200 bg-white border-ui-border-base">
        <nav className="content-container txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="flex-1 basis-0 h-full flex items-center">
            <div className="h-full">
              <SideMenu regions={regions} />
            </div>
          </div>

          <div className="flex items-center h-full">
            <LocalizedClientLink
              href="/"
              className="txt-compact-xlarge-plus hover:text-grey-90 uppercase"
              data-testid="nav-store-link"
            >
              {STORE_NAME}
            </LocalizedClientLink>
          </div>
          <div className="hidden small:flex items-center ml-6">
            <Suspense fallback={<div className="h-6 w-32 bg-gray-100 animate-pulse rounded"></div>}>
              <AreaSelector />
            </Suspense>
          </div>

          <div className="flex items-center gap-x-6 h-full flex-1 basis-0 justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
              {process.env.NEXT_PUBLIC_FEATURE_SEARCH_ENABLED && (
                <LocalizedClientLink
                  className="text-grey-60 hover:text-grey-90 transition-colors"
                  href="/search"
                  scroll={false}
                  data-testid="nav-search-link"
                >
                  Search
                </LocalizedClientLink>
              )}
              <LocalizedClientLink
                className="text-grey-60 hover:text-grey-90 transition-colors"
                href="/account"
                data-testid="nav-account-link"
              >
                Account
              </LocalizedClientLink>
            </div>
            <Suspense
              fallback={
                <LocalizedClientLink
                  className="text-grey-60 hover:text-grey-90 transition-colors flex gap-2"
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

export default NavContent
