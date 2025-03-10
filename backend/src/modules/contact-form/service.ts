import { EntityManager } from "@mikro-orm/core"
import { Logger, NotificationTypes } from "@medusajs/framework/types"
import { MedusaError } from "@medusajs/framework/utils"
import { AbstractNotificationProviderService } from "@medusajs/framework/utils"
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

class ContactFormService extends AbstractNotificationProviderService {
  static identifier = 'contact-form'
  protected readonly logger_: Logger
  protected readonly manager_: EntityManager

  constructor({ logger, manager }: InjectedDependencies) {
    super()
    this.logger_ = logger
    this.manager_ = manager
  }

  async send(
    notification: NotificationTypes.ProviderSendNotificationDTO
  ): Promise<NotificationTypes.ProviderSendNotificationResultsDTO> {
    if (!notification) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "No notification information provided"
      )
    }

    const data = notification.data as ContactFormSubmissionDTO
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
    
    return {}
  }

  // No need for send() method since we're using TransactionBaseService
}

export default ContactFormService
