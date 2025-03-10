"use client"

import React, { forwardRef, useImperativeHandle, useRef } from "react"
import NativeSelect, {
  NativeSelectProps,
} from "../native-select"

const ServiceSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ placeholder = "How Can We Help?", defaultValue, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    const serviceOptions = [
      { value: "10_yard", label: "10' Dumpster Rental" },
      { value: "15_yard", label: "15' Dumpster Rental" },
      { value: "20_yard", label: "20' Dumpster Rental" },
      { value: "30_yard", label: "30' Dumpster Rental" },
      { value: "40_yard", label: "40' Dumpster Rental" },
      { value: "other", label: "Other Services" },
    ]

    return (
      <NativeSelect
        ref={innerRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...props}
      >
        {serviceOptions.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </NativeSelect>
    )
  }
)

ServiceSelect.displayName = "ServiceSelect"

export default ServiceSelect
