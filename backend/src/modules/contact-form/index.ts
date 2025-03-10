import { ModuleProviderExports } from '@medusajs/framework/types'
import ContactFormService from './service'

export const CONTACT_FORM_SERVICE = 'contact-form'

export default {
  service: ContactFormService,
  loaders: [],
}
