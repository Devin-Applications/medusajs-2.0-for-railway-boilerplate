"use client"

import React, { useState, useCallback } from "react"
import { RegionProvider } from "./region-context"
import RegionModal from "@modules/common/components/region-modal"

export default function Providers({ children }: { children: React.ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const openModal = useCallback(() => setIsModalOpen(true), [])
  const closeModal = useCallback(() => setIsModalOpen(false), [])

  return (
    <RegionProvider onOpenModal={openModal}>
      {children}
      <RegionModal isOpen={isModalOpen} onClose={closeModal} />
    </RegionProvider>
  )
}
