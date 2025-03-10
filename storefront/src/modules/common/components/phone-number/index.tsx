"use client"

import React from "react"
import { useRegion } from "@lib/context/region-context"

type PhoneNumberProps = {
  className?: string
  showLabel?: boolean
  label?: string
}

const PhoneNumber: React.FC<PhoneNumberProps> = ({ 
  className = "", 
  showLabel = false,
  label = "Call Us: "
}) => {
  const { phoneNumber } = useRegion()
  
  return (
    <span className={className}>
      {showLabel && <span>{label}</span>}
      {phoneNumber}
    </span>
  )
}

export default PhoneNumber
