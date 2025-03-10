import { Label } from "@medusajs/ui"
import React, { useEffect, useImperativeHandle, useState } from "react"

import Eye from "@modules/common/icons/eye"
import EyeOff from "@modules/common/icons/eye-off"

type InputProps = Omit<
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
}

const InputExternalLabel = React.forwardRef<HTMLInputElement, InputProps>(
  ({ type, name, label, touched, required, ...props }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [showPassword, setShowPassword] = useState(false)
    const [inputType, setInputType] = useState(type)

    useEffect(() => {
      if (type === "password" && showPassword) {
        setInputType("text")
      }

      if (type === "password" && !showPassword) {
        setInputType("password")
      }
    }, [type, showPassword])

    useImperativeHandle(ref, () => inputRef.current!)

    return (
      <div className="flex flex-col w-full">
        <label 
          htmlFor={name}
          className="text-base font-semibold text-gray-800 mb-2 block"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
        <div className="flex relative w-full">
          <input
            type={inputType}
            name={name}
            id={name}
            required={required}
            placeholder={`Enter your ${name}`}
            className="block w-full h-10 px-4 py-2 bg-gray-100 border-[3px] border-gray-400 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-500 hover:border-orange-400 shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_3px_6px_rgba(0,0,0,0.2)] transition-all placeholder-gray-900"
            {...props}
            ref={inputRef}
          />
          {type === "password" && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-ui-fg-subtle px-4 focus:outline-none transition-all duration-150 outline-none focus:text-ui-fg-base absolute right-0 top-2"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      </div>
    )
  }
)

InputExternalLabel.displayName = "InputExternalLabel"

export default InputExternalLabel
