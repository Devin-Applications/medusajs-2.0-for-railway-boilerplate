"use client"

import { ReactNode, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { RegionProvider } from "@lib/context/region-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { ModalProvider } from "@lib/context/modal-context"

const RegionModal = dynamic(() => import("@modules/common/components/region-modal/server"), { ssr: false })

export default function Providers({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const closeModal = useCallback(() => setIsModalOpen(false), [])
  const openModal = useCallback(() => setIsModalOpen(true), [])

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
