"use client"

import { ReactNode } from "react"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { useState, useCallback } from "react"
import { RegionProvider } from "@lib/context/region-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { ModalProvider } from "@lib/context/modal-context"

const Footer = dynamic(() => import("@modules/layout/templates/footer"), { ssr: false })
const Nav = dynamic(() => import("@modules/layout/templates/nav"), { ssr: false })
const RegionModal = dynamic(() => import("@modules/common/components/region-modal/client"), { ssr: false })

export default function CountryClientLayout({ children }: { children: ReactNode }) {
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false)
  const closeModal = useCallback(() => setIsRegionModalOpen(false), [])
  const openModal = useCallback(() => setIsRegionModalOpen(true), [])

  return (
    <MobileMenuProvider>
      <ModalProvider close={closeModal}>
        <RegionProvider onOpenModal={openModal}>
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={<div>Loading...</div>}>
              <Nav />
              <main className="relative flex-grow">
                {children}
              </main>
              <Footer />
              <RegionModal isOpen={isRegionModalOpen} onClose={closeModal} />
            </Suspense>
          </div>
        </RegionProvider>
      </ModalProvider>
    </MobileMenuProvider>
  )
}
