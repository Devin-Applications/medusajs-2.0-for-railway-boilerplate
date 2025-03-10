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
          className="text-base font-semibold text-gray-800 mb-2 block"
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
            placeholder="Enter your message here..."
            className="block w-full px-4 py-2 bg-gray-100 border-[3px] border-gray-400 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-500 hover:border-orange-400 shadow-[0_4px_8px_rgba(0,0,0,0.2),inset_0_3px_6px_rgba(0,0,0,0.2)] transition-all placeholder-gray-900 resize-none"
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
