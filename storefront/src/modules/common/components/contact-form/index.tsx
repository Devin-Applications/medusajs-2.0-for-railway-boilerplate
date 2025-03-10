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
      const response = await fetch("/dk/api/contact", {
        method: "POST",
        body: formData,
        credentials: "same-origin"
      })

      if (!response.ok) {
        throw new Error("Failed to submit form")
      }

      setFormSuccess(true)
      e.currentTarget.reset()
    } catch (error) {
      setFormError("An error occurred. Please try again.")
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      <h3 className="text-xl font-semibold mb-4 text-center">Contact Us</h3>
      
      {formSuccess ? (
        <div className="bg-green-50 p-4 rounded-md text-green-800 text-center mb-4">
          Thank you for your message! We'll get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input 
            label="Name" 
            name="name" 
            required 
          />
          <Input 
            label="Email" 
            name="email" 
            type="email" 
            required 
          />
          <Input 
            label="Phone" 
            name="phone" 
            type="tel" 
            required 
          />
          <ServiceSelect 
            name="service" 
            required 
          />
          <TextArea 
            label="Message" 
            name="message" 
            rows={4} 
            required 
          />
          
          {formError && (
            <div className="text-red-500 text-sm">{formError}</div>
          )}
          
          <div className="flex justify-center">
            <Button 
              type="submit" 
              isLoading={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white"
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
