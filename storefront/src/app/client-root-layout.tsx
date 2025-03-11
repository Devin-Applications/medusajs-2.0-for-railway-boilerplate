"use client"

import { ReactNode, useState, useCallback } from "react"
import { RegionProvider } from "@lib/context/region-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { ModalProvider } from "@lib/context/modal-context"
import dynamic from "next/dynamic"

const RegionModal = dynamic(() => import("@modules/common/components/region-modal"), { ssr: false })

export default function ClientRootLayout({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const closeModal = useCallback(() => setIsModalOpen(false), [])
  const openModal = useCallback(() => setIsModalOpen(true), [])

  return (
    <MobileMenuProvider>
      <ModalProvider close={closeModal}>
        <RegionProvider onOpenModal={openModal}>
          {children}
          <RegionModal 
            isOpen={isModalOpen} 
            onClose={closeModal}
            onRegionSelect={(regionName) => {
              closeModal()
              // Handle region selection
            }}
            onZipCodeSubmit={(zipCode) => {
              closeModal()
              // Handle ZIP code submission
            }}
          />
        </RegionProvider>
      </ModalProvider>
    </MobileMenuProvider>
  )
}
