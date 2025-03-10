import { MedusaRequest, MedusaResponse } from "@medusajs/framework"
import { CONTACT_FORM_SERVICE } from "../../../modules/contact-form"
import ContactFormService from "../../../modules/contact-form/service"

export async function POST(
  req: MedusaRequest,
  res: MedusaResponse
): Promise<void> {
  try {
    const contactFormService: ContactFormService = req.scope.resolve(CONTACT_FORM_SERVICE)
    
    const { name, email, phone, service, address, message } = req.body as {
      name: string
      email: string
      phone: string
      service: string
      address?: string
      message: string
    }
    
    const submission = await contactFormService.create({
      name,
      email,
      phone,
      service,
      address,
      message,
    })
    
    res.status(201).json({ id: submission.id, success: true })
  } catch (error) {
    res.status(400).json({ 
      success: false, 
      message: error.message 
    })
  }
}
