"use client"

import React from "react"
import RegionModal from "./index"
import { RegionModalProps } from "./types"

export default function ClientRegionModal(props: RegionModalProps) {
  return <RegionModal {...props} />
}
