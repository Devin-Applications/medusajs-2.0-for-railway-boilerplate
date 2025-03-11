import { ModuleProviderExports } from '@medusajs/framework/types'
import ContactFormService from './service'

const services = [ContactFormService]

const providerExport: ModuleProviderExports = {
  services,
  loaders: [],
}

export default providerExport
