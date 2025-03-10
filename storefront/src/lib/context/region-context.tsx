"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react"
import { useLocalStorage } from "../hooks/use-local-storage"
import { regions, defaultRegion, RegionConfig } from "../config/regions"

interface RegionContextType {
  selectedRegion: RegionConfig
  setRegionByName: (name: string) => void
  setRegionByZipCode: (zipCode: string) => void
  showRegionModal: boolean
  setShowRegionModal: (show: boolean) => void
  phoneNumber: string
}

const RegionContext = createContext<RegionContextType | undefined>(undefined)

export const RegionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedRegion, setSelectedRegion] = useLocalStorage<RegionConfig>(
    "selected-region",
    defaultRegion
  )
  const [hasVisited, setHasVisited] = useLocalStorage<boolean>(
    "has-visited",
    false
  )
  const [showRegionModal, setShowRegionModal] = useState(!hasVisited)

  useEffect(() => {
    if (showRegionModal === false && !hasVisited) {
      setHasVisited(true)
    }
  }, [showRegionModal, hasVisited, setHasVisited])

  const setRegionByName = (name: string) => {
    const region = regions.find((r) => r.name === name)
    if (region) {
      setSelectedRegion(region)
    }
  }

  const setRegionByZipCode = (zipCode: string) => {
    const region = regions.find((r) => r.zipCodes.includes(zipCode))
    if (region) {
      setSelectedRegion(region)
    }
  }

  return (
    <RegionContext.Provider
      value={{
        selectedRegion,
        setRegionByName,
        setRegionByZipCode,
        showRegionModal,
        setShowRegionModal,
        phoneNumber: selectedRegion.phone
      }}
    >
      {children}
    </RegionContext.Provider>
  )
}

export const useRegion = () => {
  const context = useContext(RegionContext)
  if (context === undefined) {
    throw new Error("useRegion must be used within a RegionProvider")
  }
  return context
}
