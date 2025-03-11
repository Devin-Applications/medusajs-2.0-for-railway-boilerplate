"use client"

import { ReactNode, useState, useCallback } from "react"
import dynamic from "next/dynamic"
import { RegionProvider, useRegion } from "@lib/context/region-context"
import { MobileMenuProvider } from "@lib/context/mobile-menu-context"
import { ModalProvider } from "@lib/context/modal-context"

const Nav = dynamic(() => import("@modules/layout/templates/nav"), { ssr: false })
const Footer = dynamic(() => import("@modules/layout/templates/footer"), { ssr: false })
const RegionModal = dynamic(() => import("@modules/common/components/region-modal"), { ssr: false })

function LayoutContent({ children }: { children: ReactNode }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { setRegionByName, setRegionByZipCode } = useRegion()
  
  const closeModal = useCallback(() => setIsModalOpen(false), [])
  const openModal = useCallback(() => setIsModalOpen(true), [])
  
  const handleRegionSelect = useCallback((regionName: string) => {
    setRegionByName(regionName)
    closeModal()
  }, [setRegionByName, closeModal])
  
  const handleZipCodeSubmit = useCallback((zipCode: string) => {
    setRegionByZipCode(zipCode)
    closeModal()
  }, [setRegionByZipCode, closeModal])

  return (
    <>
      <Nav />
      {children}
      <Footer />
      <RegionModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        onRegionSelect={handleRegionSelect}
        onZipCodeSubmit={handleZipCodeSubmit}
      />
    </>
  )
}

export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <MobileMenuProvider>
      <ModalProvider>
        <RegionProvider>
          <LayoutContent>{children}</LayoutContent>
        </RegionProvider>
      </ModalProvider>
    </MobileMenuProvider>
  )
}
