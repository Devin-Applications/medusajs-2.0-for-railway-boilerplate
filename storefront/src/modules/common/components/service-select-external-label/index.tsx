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
        className="text-sm font-medium text-gray-700 mb-1"
      >
        {label}
        {required && <span className="text-rose-500 ml-1">*</span>}
      </label>
      <div className="flex relative w-full">
        <select
          name={name}
          id={name}
          required={required}
          className={`${className} block w-full h-10 px-4 py-2 bg-white border rounded-md appearance-none focus:outline-none focus:ring-0 focus:border-grey-90 border-grey-20 hover:border-grey-40 transition-colors`}
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
