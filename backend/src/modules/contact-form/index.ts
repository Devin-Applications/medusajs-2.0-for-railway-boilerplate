import { ModuleProviderExports } from '@medusajs/framework/types'
import ContactFormService from './service'

const services = [ContactFormService]

const providerExport: ModuleProviderExports = {
  services,
}

export default providerExport
