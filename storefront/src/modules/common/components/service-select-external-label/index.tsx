import React from "react"

type NativeSelectProps = {
  className?: string
  errors?: Record<string, unknown>
  touched?: Record<string, unknown>
  name: string
  label: string
  required?: boolean
}

const ServiceSelectExternalLabel: React.FC<NativeSelectProps> = ({
  className,
  name,
  label,
  required = false,
  ...props
}) => {
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
        <select
          name={name}
          id={name}
          required={required}
          className={`${className} block w-full max-w-xs h-10 px-4 py-2 bg-gray-200 border-2 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-orange-500 border-gray-400 hover:border-orange-400 shadow-lg transition-all placeholder-gray-500`}
          {...props}
        >
          <option value="" disabled selected>Select a Service</option>
          <option value="15_yard">15 Yard Dumpster</option>
          <option value="20_yard">20 Yard Dumpster</option>
          <option value="30_yard">30 Yard Dumpster</option>
          <option value="40_yard">40 Yard Dumpster</option>
        </select>
      </div>
    </div>
  )
}

export default ServiceSelectExternalLabel
