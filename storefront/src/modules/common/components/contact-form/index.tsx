"use client"

import { Button } from "@medusajs/ui"
import React, { useState } from "react"
import Input from "../input"
import TextArea from "../textarea"
import ServiceSelect from "../service-select"
import { AREA_PHONE_NUMBERS } from "../../../../lib/area-constants"

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const phoneNumber = AREA_PHONE_NUMBERS[""] // Default phone number

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
    <div className="w-full bg-white p-8 rounded-lg shadow-sm">
      <h3 className="text-2xl font-semibold text-grey-90 mb-6 text-center">Contact Us</h3>
      <p className="text-grey-60 mb-6 text-center">
        Fill out this form or call us anytime at <a href={`tel:${phoneNumber.replace(/\D/g, '')}`} className="text-grey-90 font-medium">{phoneNumber}</a> and we will be in touch with you shortly!
      </p>
      
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input 
              label="Address" 
              name="address" 
              className="bg-white focus:border-grey-90"
            />
            <Input
              label="Pincode"
              name="pincode"
              type="text"
              pattern="[0-9]{5}"
              maxLength={5}
              required
              className="bg-white focus:border-grey-90"
            />
          </div>
          <TextArea 
            label="Message" 
            name="message" 
            rows={4} 
            required 
            className="bg-white focus:border-grey-90"
          />
          
          {formError && (
            <div className="bg-red-50 p-4 rounded-md text-red-800 text-center mb-4">
              {formError}
            </div>
          )}
          
          <div className="flex justify-center">
            <Button 
              type="submit" 
              isLoading={isSubmitting}
              className="bg-grey-90 hover:bg-grey-80 text-white px-8 py-3 rounded-md"
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
