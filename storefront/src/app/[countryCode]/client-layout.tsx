"use client"

import { ReactNode } from "react"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import RegionModal from "@modules/common/components/region-modal"
import { RegionProvider } from "@lib/context/region-context"
import { useState } from "react"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { ModalProvider } from "@lib/context/modal-context"

const Footer = dynamic(() => import("@modules/layout/templates/footer"), { ssr: false })
const Nav = dynamic(() => import("@modules/layout/templates/nav"), { ssr: false })

export default function CountryClientLayout({ children }: { children: ReactNode }) {
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false)

  return (
    <MobileMenuProvider>
      <ModalProvider>
        <RegionProvider onOpenModal={() => setIsRegionModalOpen(true)}>
          <div className="flex min-h-screen flex-col">
            <Nav />
            <main className="relative flex-grow">
              {children}
            </main>
            <Footer />
            <RegionModal isOpen={isRegionModalOpen} onClose={() => setIsRegionModalOpen(false)} />
          </div>
        </RegionProvider>
      </ModalProvider>
    </MobileMenuProvider>
  )
}
