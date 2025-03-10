import { EntityManager } from "@mikro-orm/core"
import { Logger, ProviderUploadFileDTO, ProviderDeleteFileDTO, ProviderFileResultDTO, ProviderGetFileDTO } from "@medusajs/framework/types"
import { MedusaError } from "@medusajs/framework/utils"
import { AbstractFileProviderService } from "@medusajs/framework/utils"
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

class ContactFormService extends AbstractFileProviderService {
  static identifier = 'contact-form'
  protected readonly logger_: Logger
  protected readonly manager_: EntityManager

  constructor({ logger, manager }: InjectedDependencies) {
    super()
    this.logger_ = logger
    this.manager_ = manager
  }

  async upload(
    file: ProviderUploadFileDTO
  ): Promise<ProviderFileResultDTO> {
    throw new MedusaError(
      MedusaError.Types.NOT_IMPLEMENTED,
      "Method not implemented"
    )
  }

  async delete(
    fileData: ProviderDeleteFileDTO
  ): Promise<void> {
    throw new MedusaError(
      MedusaError.Types.NOT_IMPLEMENTED,
      "Method not implemented"
    )
  }

  async getPresignedDownloadUrl(
    fileData: ProviderGetFileDTO
  ): Promise<string> {
    throw new MedusaError(
      MedusaError.Types.NOT_IMPLEMENTED,
      "Method not implemented"
    )
  }

  // No need for send() method since we're using TransactionBaseService
}

export default ContactFormService
