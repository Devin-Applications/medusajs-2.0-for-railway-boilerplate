"use client"

import { Button } from "@medusajs/ui"
import React, { useState } from "react"
import Input from "../input"
import TextArea from "../textarea"
import ServiceSelect from "../service-select"

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    const formData = new FormData(e.currentTarget)
    
    try {
      const response = await fetch(`/${window.location.pathname.split('/')[1]}/api/contact`, {
        method: "POST",
        body: formData
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setFormSuccess(true)
      const form = e.target as HTMLFormElement
      form.reset()
    } catch (error) {
      setFormError("An error occurred. Please try again.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold text-grey-90 mb-6 text-center">Contact Us</h3>
      
      {formSuccess ? (
        <div className="bg-green-50 p-4 rounded-md text-green-800 text-center mb-4">
          Thank you for your message! We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Name" 
              name="name" 
              required 
              className="bg-white focus:border-grey-90"
            />
            <Input 
              label="Email" 
              name="email" 
              type="email" 
              required 
              className="bg-white focus:border-grey-90"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Phone" 
              name="phone" 
              type="tel" 
              required 
              className="bg-white focus:border-grey-90"
            />
            <ServiceSelect 
              name="service" 
              required 
              className="bg-white focus:border-grey-90"
            />
          </div>
          <TextArea 
            label="Message" 
            name="message" 
            rows={4} 
            required 
            className="bg-white focus:border-blue-500"
          />
          
          {formError && (
            <div className="text-red-500 text-sm">{formError}</div>
          )}
          
          <div className="flex justify-center">
            <Button 
              type="submit" 
              isLoading={isSubmitting}
              className="bg-grey-90 hover:bg-grey-80 text-white px-6 py-2 rounded-md"
            >
              Send Message
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export default ContactForm
