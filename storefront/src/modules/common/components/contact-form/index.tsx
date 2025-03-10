"use client"

import { Button } from "@medusajs/ui"
import React, { useState, useEffect } from "react"
import InputExternalLabel from "../input-external-label"
import TextAreaExternalLabel from "../textarea-external-label"
import ServiceSelectExternalLabel from "../service-select-external-label"
import ReCAPTCHA from "react-google-recaptcha"

type ContactFormProps = {
  inFooter?: boolean
}

const ContactForm = ({ inFooter = false }: ContactFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formSuccess, setFormSuccess] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [captchaToken, setCaptchaToken] = useState<string | null>(null)

  const handleCaptchaChange = (token: string | null) => {
    setCaptchaToken(token)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormError(null)

    if (!captchaToken) {
      setFormError("Please complete the captcha")
      setIsSubmitting(false)
      return
    }

    const formData = new FormData(e.currentTarget)
    formData.append('captchaToken', captchaToken)
    
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
    <div className="w-full bg-white rounded-lg">
      <div className="w-full">
        <h3 className="text-2xl font-semibold text-grey-90 mb-6 text-center">Contact Us</h3>
        <p className="text-grey-60 mb-8 text-center">
          Fill out this form or call us anytime at <a href="tel:5165151951" className="text-grey-90 font-medium hover:text-orange-500 transition-colors">(516) 515-1951</a> and we will be in touch with you shortly!
        </p>
        {formSuccess ? (
          <div className="bg-green-50 p-4 rounded-md text-green-800 text-center mb-4">
            Thank you for your message! We'll get back to you soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 gap-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="w-full">
                  <InputExternalLabel 
                    label="Name" 
                    name="name" 
                    required 
                    className="bg-white focus:border-grey-90 w-full text-base"
                  />
                </div>
                <div className="w-full">
                  <InputExternalLabel 
                    label="Email" 
                    name="email" 
                    type="email" 
                    required 
                    className="bg-white focus:border-grey-90 w-full text-base"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="w-full">
                  <InputExternalLabel 
                    label="Phone" 
                    name="phone" 
                    type="tel" 
                    required 
                    className="bg-white focus:border-grey-90 w-full text-base"
                  />
                </div>
                <div className="w-full">
                  <ServiceSelectExternalLabel 
                    label="Service"
                    name="service" 
                    required 
                    className="bg-white focus:border-grey-90 w-full text-base"
                  />
                </div>
              </div>
              <div className="w-full">
                <InputExternalLabel 
                  label="Address" 
                  name="address" 
                  className="bg-white focus:border-grey-90 w-full text-base"
                />
              </div>
              <div className="w-full">
                <TextAreaExternalLabel 
                  label="Message" 
                  name="message" 
                  rows={4} 
                  required 
                  className="bg-white focus:border-grey-90 w-full text-base"
                />
              </div>
            </div>
            
            <div className="flex justify-center my-4">
              <ReCAPTCHA
                sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
                onChange={handleCaptchaChange}
              />
            </div>
            
            {formError && (
              <div className="bg-red-50 p-4 rounded-md text-red-800 text-center mb-4">
                {formError}
              </div>
            )}
            
            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                isLoading={isSubmitting}
                className={`${inFooter ? "bg-grey-90 hover:bg-grey-80 text-white px-8 py-3" : "bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 text-lg font-medium shadow-md hover:shadow-lg transform hover:scale-[1.02]"} rounded-lg transition-all`}
              >
                Send Message
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

export default ContactForm
