"use client"

import { ReactNode } from "react"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { useState, useCallback } from "react"

const Footer = dynamic(() => import("@modules/layout/templates/footer"), { ssr: false })
const Nav = dynamic(() => import("@modules/layout/templates/nav"), { ssr: false })
const RegionModal = dynamic(() => import("@modules/common/components/region-modal"), { ssr: false })
const RegionProvider = dynamic(() => import("@lib/context/region-context").then(mod => mod.RegionProvider), { ssr: false })
const MobileMenuProvider = dynamic(() => import("@lib/context/mobile-menu-context").then(mod => mod.MobileMenuProvider), { ssr: false })
const ModalProvider = dynamic(() => import("@lib/context/modal-context").then(mod => mod.ModalProvider), { ssr: false })

export default function CountryClientLayout({ children }: { children: ReactNode }) {
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false)
  const closeModal = useCallback(() => setIsRegionModalOpen(false), [])
  const openModal = useCallback(() => setIsRegionModalOpen(true), [])

  return (
    <Suspense>
      <MobileMenuProvider>
        <ModalProvider close={closeModal}>
          <RegionProvider onOpenModal={openModal}>
            <div className="flex min-h-screen flex-col">
              <Nav />
              <main className="relative flex-grow">
                {children}
              </main>
              <Footer />
              <RegionModal isOpen={isRegionModalOpen} onClose={closeModal} />
            </div>
          </RegionProvider>
        </ModalProvider>
      </MobileMenuProvider>
    </Suspense>
  )
}
