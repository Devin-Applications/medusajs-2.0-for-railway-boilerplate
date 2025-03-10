"use client"

import { Label } from "@medusajs/ui"
import React, { useImperativeHandle, useState } from "react"

type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  topLabel?: string
}

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name, label, touched, required, topLabel, rows = 4, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(false)

    useImperativeHandle(ref, () => textareaRef.current!)

    const handleFocus = () => {
      setIsFocused(true)
    }

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false)
      setHasValue(!!e.target.value)
    }

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasValue(!!e.target.value)
      if (props.onChange) {
        props.onChange(e)
      }
    }

    return (
      <div className="flex flex-col w-full">
        {topLabel && (
          <Label className="mb-2 txt-compact-medium-plus">{topLabel}</Label>
        )}
        <div className="flex relative z-0 w-full txt-compact-medium">
          <textarea
            name={name}
            placeholder=" "
            required={required}
            rows={rows}
            className="pt-4 pb-1 block w-full px-4 mt-0 bg-ui-bg-field border rounded-md appearance-none focus:outline-none focus:ring-0 focus:shadow-borders-interactive-with-active border-ui-border-base hover:bg-ui-bg-field-hover"
            {...props}
            ref={textareaRef}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleChange}
          />
          <label
            htmlFor={name}
            onClick={() => textareaRef.current?.focus()}
            className={`flex items-center justify-center mx-3 px-1 transition-all absolute duration-300 top-3 -z-1 origin-0 text-ui-fg-subtle ${
              (isFocused || hasValue) ? "transform scale-75 -translate-y-3 text-xs" : ""
            }`}
          >
            {label}
            {required && <span className="text-rose-500">*</span>}
          </label>
        </div>
      </div>
    )
  }
)

TextArea.displayName = "TextArea"

export default TextArea
