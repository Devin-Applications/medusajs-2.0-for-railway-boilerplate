"use client"

import React, { forwardRef, useImperativeHandle, useRef } from "react"
import NativeSelect, {
  NativeSelectProps,
} from "../native-select"
import { SERVICE_AREAS } from "../../../../lib/area-constants"

const AreaSelect = forwardRef<HTMLSelectElement, NativeSelectProps>(
  ({ placeholder = "Select Your Area", defaultValue, ...props }, ref) => {
    const innerRef = useRef<HTMLSelectElement>(null)

    useImperativeHandle<HTMLSelectElement | null, HTMLSelectElement | null>(
      ref,
      () => innerRef.current
    )

    return (
      <NativeSelect
        ref={innerRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...props}
      >
        {SERVICE_AREAS.map(({ value, label }, index) => (
          <option key={index} value={value}>
            {label}
          </option>
        ))}
      </NativeSelect>
    )
  }
)

AreaSelect.displayName = "AreaSelect"

export default AreaSelect
