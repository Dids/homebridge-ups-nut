import { AccessoryConfig } from 'homebridge'

export const PLUGIN_NAME = 'homebridge-ups-nut'
export const ACCESSORY_NAME = 'UPS'

// TODO: Actually define, parse and validate accessory configuration

export interface INUTAccessoryConfig extends AccessoryConfig {
  manufacturer: string
  model: string

  nutIpAddress: string
  nutUsername?: string
  nutPassword?: string
}
