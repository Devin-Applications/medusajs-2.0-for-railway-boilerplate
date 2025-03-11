"use client"

import { ReactNode, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { RegionProvider } from "@lib/context/region-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { ModalProvider } from "@lib/context/modal-context"

const Nav = dynamic(() => import("@modules/layout/templates/nav"), { ssr: false })
const Footer = dynamic(() => import("@modules/layout/templates/footer"), { ssr: false })
const RegionModal = dynamic(() => import("@modules/common/components/region-modal/client"), { ssr: false })

export default function ClientLayout({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const closeModal = useCallback(() => setIsModalOpen(false), [])
  const openModal = useCallback(() => setIsModalOpen(true), [])

  return (
    <MobileMenuProvider>
      <ModalProvider close={closeModal}>
        <RegionProvider onOpenModal={openModal}>
          <div className="flex min-h-screen flex-col">
            <div className="flex-1">
              <Nav />
              <main>{children}</main>
              <Footer />
            </div>
          </div>
          <RegionModal isOpen={isModalOpen} onClose={closeModal} />
        </RegionProvider>
      </ModalProvider>
    </MobileMenuProvider>
  )
}
