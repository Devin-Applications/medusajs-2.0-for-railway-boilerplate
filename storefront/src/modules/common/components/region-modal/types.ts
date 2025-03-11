export interface RegionModalProps {
  isOpen: boolean
  onClose: () => void
  onRegionSelect: (regionName: string) => void
  onZipCodeSubmit: (zipCode: string) => void
}
