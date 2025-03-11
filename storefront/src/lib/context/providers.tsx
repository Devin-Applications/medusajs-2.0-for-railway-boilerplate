"use client"

import React, { useState, useCallback, Suspense } from "react"
import dynamic from "next/dynamic"
import { RegionProvider } from "./region-context"
import { ModalProvider } from "./modal-context"
import { MobileMenuProvider } from "./mobile-menu-context"

const RegionModal = dynamic(() => import("@modules/common/components/region-modal/client"), { ssr: false })

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const openModal = useCallback(() => setIsModalOpen(true), [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  return (
    <MobileMenuProvider>
      <ModalProvider close={closeModal}>
        <RegionProvider onOpenModal={openModal}>
          {children}
          <Suspense fallback={<div>Loading...</div>}>
            <RegionModal isOpen={isModalOpen} onClose={closeModal} />
          </Suspense>
        </RegionProvider>
      </ModalProvider>
    </MobileMenuProvider>
  )
}

export default Providers
