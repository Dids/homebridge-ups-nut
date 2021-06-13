import {
  API
} from 'homebridge'
import { UPSAccessory } from './accessory'
import { PLUGIN_NAME, ACCESSORY_NAME } from './config'

// Export to Homebridge
export = (api: API): void => {
  api.registerAccessory(PLUGIN_NAME, ACCESSORY_NAME, UPSAccessory)
}
