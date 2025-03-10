"use client"

import React, { useState, useCallback } from "react"
import { RegionProvider } from "./region-context"
import RegionModal from "@modules/common/components/region-modal"
import { ModalProvider } from "./modal-context"
import { MobileMenuProvider } from "./mobile-menu-context"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const openModal = useCallback(() => setIsModalOpen(true), [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  return (
    <MobileMenuProvider>
      <ModalProvider close={closeModal}>
        <RegionProvider onOpenModal={openModal}>
          {children}
          <RegionModal isOpen={isModalOpen} onClose={closeModal} />
        </RegionProvider>
      </ModalProvider>
    </MobileMenuProvider>
  )
}

export default Providers
