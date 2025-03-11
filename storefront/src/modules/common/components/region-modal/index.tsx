"use client"

import { RegionModalProps } from "./types"
import dynamic from "next/dynamic"

const ClientRegionModal = dynamic(() => import("./client"), { 
  ssr: false,
  loading: () => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-xl">Loading...</div>
    </div>
  )
})

export default function RegionModal(props: RegionModalProps) {
  return <ClientRegionModal {...props} />
}
