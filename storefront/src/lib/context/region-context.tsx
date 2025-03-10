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
  const [selectedRegion, setSelectedRegion] = useState<RegionConfig>(defaultRegion)
  const [hasVisited, setHasVisited] = useState(false)
  const [showRegionModal, setShowRegionModal] = useState(true)

  useEffect(() => {
    try {
      const storedRegion = localStorage.getItem("selected-region")
      const storedHasVisited = localStorage.getItem("has-visited")
      
      if (storedRegion) {
        setSelectedRegion(JSON.parse(storedRegion))
      }
      if (storedHasVisited) {
        setHasVisited(JSON.parse(storedHasVisited))
        setShowRegionModal(false)
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem("selected-region", JSON.stringify(selectedRegion))
    } catch (error) {
      console.error("Error writing to localStorage:", error)
    }
  }, [selectedRegion])

  useEffect(() => {
    if (showRegionModal === false && !hasVisited) {
      setHasVisited(true)
      try {
        localStorage.setItem("has-visited", JSON.stringify(true))
      } catch (error) {
        console.error("Error writing to localStorage:", error)
      }
    }
  }, [showRegionModal, hasVisited])

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
