import { ModuleProviderExports } from '@medusajs/framework/types'
import ContactFormService from './service'

const services = [ContactFormService]

export const CONTACT_FORM_SERVICE = 'contact-form'

const providerExport: ModuleProviderExports = {
  services,
}

export default providerExport
