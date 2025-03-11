import React from "react"
import dynamic from "next/dynamic"
import { RegionModalProps } from "./types"

const ClientRegionModal = dynamic(() => import("./client"), { ssr: false })

export default function RegionModal(props: RegionModalProps) {
  return <ClientRegionModal {...props} />
}
