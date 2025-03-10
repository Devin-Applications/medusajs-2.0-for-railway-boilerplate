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
      { value: "", label: "Select a Service" },
      { value: "15_yard", label: "15 Yard Dumpster" },
      { value: "20_yard", label: "20 Yard Dumpster" },
      { value: "30_yard", label: "30 Yard Dumpster" },
      { value: "40_yard", label: "40 Yard Dumpster" }
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
