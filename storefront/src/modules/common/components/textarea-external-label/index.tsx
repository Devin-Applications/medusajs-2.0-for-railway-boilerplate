import React, { useImperativeHandle } from "react"

type TextAreaProps = Omit<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>,
  "placeholder"
> & {
  label: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
}

const TextAreaExternalLabel = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ name, label, touched, required, rows = 4, ...props }, ref) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    useImperativeHandle(ref, () => textareaRef.current!)

    return (
      <div className="flex flex-col w-full">
        <label 
          htmlFor={name}
          className="text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-rose-500 ml-1">*</span>}
        </label>
        <div className="flex relative w-full">
          <textarea
            name={name}
            id={name}
            required={required}
            rows={rows}
            className="block w-full px-4 py-2 bg-white border rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-grey-90 border-grey-20 hover:border-grey-40 transition-colors resize-none"
            maxLength={500}
            {...props}
            ref={textareaRef}
          />
        </div>
      </div>
    )
  }
)

TextAreaExternalLabel.displayName = "TextAreaExternalLabel"

export default TextAreaExternalLabel
