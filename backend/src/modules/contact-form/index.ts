import { ModuleProviderExports } from '@medusajs/framework/types'
import ContactFormService from './service'

export const CONTACT_FORM_SERVICE = 'contact-form'

const services = [ContactFormService]

const providerExport: ModuleProviderExports = {
  services,
}

export default providerExport
