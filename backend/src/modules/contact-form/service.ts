import { EntityManager } from "@mikro-orm/core"
import { Logger } from "@medusajs/framework/types"
import { MedusaError } from "@medusajs/framework/utils"
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
  protected readonly logger_: Logger
  protected readonly manager_: EntityManager

  constructor({ logger, manager }: InjectedDependencies) {
    this.logger_ = logger
    this.manager_ = manager
  }

  async create(data: ContactFormSubmissionDTO): Promise<ContactFormSubmission> {
    try {
      if (!data.name || !data.email || !data.phone || !data.service || !data.message) {
        throw new MedusaError(
          MedusaError.Types.INVALID_DATA,
          "Missing required fields for contact form submission"
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
    } catch (error) {
      this.logger_.error(`Failed to create contact form submission: ${error.message}`)
      throw error
    }
  }

  async list(): Promise<ContactFormSubmission[]> {
    return await this.manager_.find(ContactFormSubmission, {}, { orderBy: { created_at: "DESC" } })
  }

  async get(id: string): Promise<ContactFormSubmission> {
    const submission = await this.manager_.findOne(ContactFormSubmission, { id })
    
    if (!submission) {
      throw new MedusaError(
        MedusaError.Types.NOT_FOUND,
        `Contact form submission with id ${id} not found`
      )
    }
    
    return submission
  }
}

export default ContactFormService
