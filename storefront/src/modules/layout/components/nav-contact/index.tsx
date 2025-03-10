"use client"

import React from "react"
import { useRegion } from "../../../../lib/context/region-context"
import PhoneNumber from "../../../common/components/phone-number"

const NavContact = () => {
  const { phoneNumber } = useRegion()
  const phoneNumberDigits = phoneNumber.replace(/\D/g, '')
  
  return (
    <a href={`tel:${phoneNumberDigits}`} className="flex items-center text-grey-60 hover:text-grey-90 transition-colors">
      <span className="mr-2">📞</span>
      <span className="font-medium">Call Us: <PhoneNumber /></span>
    </a>
  )
}

export default NavContact
