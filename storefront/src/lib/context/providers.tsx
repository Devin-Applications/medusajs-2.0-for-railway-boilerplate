"use client"

import React, { useState, useCallback, Suspense } from "react"
import dynamic from "next/dynamic"
import { RegionProvider } from "./region-context"
import { ModalProvider } from "./modal-context"
import { MobileMenuProvider } from "./mobile-menu-context"

const Nav = dynamic(() => import("@modules/layout/templates/nav"), { ssr: false })
const Footer = dynamic(() => import("@modules/layout/templates/footer"), { ssr: false })
const RegionModal = dynamic(() => import("@modules/common/components/region-modal/client"), { ssr: false })

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const openModal = useCallback(() => setIsModalOpen(true), [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  return (
    <MobileMenuProvider>
      <ModalProvider close={closeModal}>
        <RegionProvider onOpenModal={openModal}>
          <div className="flex min-h-screen flex-col">
            <Suspense fallback={<div className="h-16 bg-white border-b border-ui-border-base" />}>
              <Nav />
            </Suspense>
            <main className="relative flex-grow">
              {children}
            </main>
            <Suspense fallback={<div className="h-[200px] bg-white border-t border-ui-border-base" />}>
              <Footer />
            </Suspense>
            <RegionModal isOpen={isModalOpen} onClose={closeModal} />
          </div>
        </RegionProvider>
      </ModalProvider>
    </MobileMenuProvider>
  )
}

export default Providers
