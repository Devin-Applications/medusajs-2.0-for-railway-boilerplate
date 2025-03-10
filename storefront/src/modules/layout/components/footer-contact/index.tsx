"use client"

import React from "react"
import { useRegion } from "../../../../lib/context/region-context"
import PhoneNumber from "../../../common/components/phone-number"

const FooterContact = () => {
  const { phoneNumber } = useRegion()
  const phoneNumberDigits = phoneNumber.replace(/\D/g, '')
  
  return (
    <div className="flex items-center">
      <span className="w-8 h-8 flex items-center justify-center bg-grey-10 rounded-full mr-3">📞</span>
      <a href={`tel:${phoneNumberDigits}`} className="text-grey-60 hover:text-grey-90 font-medium transition-colors">
        <PhoneNumber />
      </a>
    </div>
  )
}

export default FooterContact
