import { Logger } from "@medusajs/framework/types"
import { MedusaError } from "@medusajs/framework/utils"
import { EntityManager } from "@mikro-orm/core"
import { ContactFormSubmission } from "./entity"

type InjectedDependencies = {
  logger: Logger
  manager: EntityManager
}

export interface ContactFormSubmissionDTO {
  name: string
  email: string
  phone: string
  service: string
  address?: string
  message: string
}

class ContactFormService {
  static identifier = 'contact_form'
  protected readonly logger_: Logger
  protected readonly manager_: EntityManager

  constructor({ logger, manager }: InjectedDependencies) {
    this.logger_ = logger
    this.manager_ = manager
  }

  async create(data: ContactFormSubmissionDTO): Promise<ContactFormSubmission> {
    if (!data) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No submission data provided"
      )
    }

    const submission = this.manager_.create(ContactFormSubmission, {
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      address: data.address,
      message: data.message,
    })

    await this.manager_.persistAndFlush(submission)
    this.logger_.info(`Created contact form submission with id: ${submission.id}`)
    
    return submission
  }
}

export default ContactFormService
