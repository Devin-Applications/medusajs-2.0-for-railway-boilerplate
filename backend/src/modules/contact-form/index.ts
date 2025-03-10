import { ModuleProviderExports } from '@medusajs/framework/types'
import ContactFormService from './service'

export const CONTACT_FORM_SERVICE = 'contact-form'

const services = [ContactFormService]

const providerExport: ModuleProviderExports = {
  services,
  moduleKey: CONTACT_FORM_SERVICE,
}

export default providerExport
