import { ModuleProviderExports } from '@medusajs/framework/types'
import ContactFormService from './service'

export const CONTACT_FORM_SERVICE = 'contactFormService'

const services = [ContactFormService]

export default {
  services,
  moduleKey: CONTACT_FORM_SERVICE,
} as ModuleProviderExports
