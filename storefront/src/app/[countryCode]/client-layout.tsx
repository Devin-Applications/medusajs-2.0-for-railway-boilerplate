"use client"

import { ReactNode } from "react"
import dynamic from "next/dynamic"
import { Suspense } from "react"
import { useState, useCallback } from "react"
import { RegionProvider } from "@lib/context/region-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { ModalProvider } from "@lib/context/modal-context"

const RegionModal = dynamic(() => import("@modules/common/components/region-modal/server"), { ssr: false })

export default function CountryClientLayout({ children }: { children: ReactNode }) {
  const [isRegionModalOpen, setIsRegionModalOpen] = useState(false)
  const closeModal = useCallback(() => setIsRegionModalOpen(false), [])
  const openModal = useCallback(() => setIsRegionModalOpen(true), [])

  return (
    <MobileMenuProvider>
      <ModalProvider close={closeModal}>
        <RegionProvider onOpenModal={openModal}>
          {children}
          <RegionModal isOpen={isRegionModalOpen} onClose={closeModal} />
        </RegionProvider>
      </ModalProvider>
    </MobileMenuProvider>
  )
}
