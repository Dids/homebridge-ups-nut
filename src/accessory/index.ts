import { AccessoryConfig, API, CharacteristicValue, Logger, PlatformAccessory, Service } from 'homebridge'
import { INUTAccessoryConfig } from '../config'

export interface IUPSAccessory extends Partial<PlatformAccessory> {
  readonly log: Logger
  readonly config: INUTAccessoryConfig | AccessoryConfig
  readonly api: API

  readonly name: string

  readonly informationService: Service
  readonly batteryService: Service
  readonly contactSensorService: Service

  statusLowBattery: CharacteristicValue
  batteryLevel: CharacteristicValue
  chargingState: CharacteristicValue

  contactSensorState: CharacteristicValue

  // TODO: Properly implement and use proper types (required for Accessories)
  //       https://github.com/J1mbo/homebridge-APC-Back-UPS-HS500/blob/master/index.js
  getServices(): Array<Service>

  getStatusLowBattery(): Promise<CharacteristicValue>
  getBatteryLevel(): Promise<CharacteristicValue>
  getChargingState(): Promise<CharacteristicValue>

  getContactSensorState(): Promise<CharacteristicValue>
}

export class UPSAccessory implements IUPSAccessory {
  readonly log: Logger
  readonly config: INUTAccessoryConfig | AccessoryConfig
  readonly api: API

  readonly name: string

  readonly informationService: Service
  readonly batteryService: Service
  readonly contactSensorService: Service

  statusLowBattery: CharacteristicValue
  batteryLevel: CharacteristicValue
  chargingState: CharacteristicValue

  contactSensorState: CharacteristicValue

  /**
   * REQUIRED - This is the entry point to your plugin
   */
  constructor(log: Logger, config: INUTAccessoryConfig | AccessoryConfig, api: API) {
    if (!log) {
      throw new Error('Invalid or missing Homebridge logger')
    }
    this.log = log

    if (!config) {
      throw new Error('Invalid or missing accessory config')
    }
    this.config = config

    if (!api) {
      throw new Error('Invalid or missing Homebridge API reference')
    }
    this.api = api

    if (!this.config.name) {
      throw new Error('Invalid or missing accessory name in config')
    }
    this.name = this.config.name

    this.log.info('UPS accessory plugin loaded')

    this.log.debug('Accessory config:', JSON.stringify(config))

    this.statusLowBattery = this.api.hap.Characteristic.StatusLowBattery.BATTERY_LEVEL_NORMAL
    this.batteryLevel = 100
    this.chargingState = this.api.hap.Characteristic.ChargingState.NOT_CHARGING

    this.contactSensorState = this.api.hap.Characteristic.ContactSensorState.CONTACT_DETECTED

    // FIXME: How do we update this dynamically from NUT? Should we do that?
    // your accessory must have an AccessoryInformation service
    this.informationService = new this.api.hap.Service.AccessoryInformation()
      .setCharacteristic(this.api.hap.Characteristic.Manufacturer, this.config.manufacturer)
      .setCharacteristic(this.api.hap.Characteristic.Model, this.config.model)

    // create a new "Battery" service
    this.batteryService = new this.api.hap.Service.Battery(this.name)

    // link methods used when getting or setting the state of the service
    this.batteryService.getCharacteristic(this.api.hap.Characteristic.StatusLowBattery)
      .onGet(this.getStatusLowBattery.bind(this))
    this.batteryService.getCharacteristic(this.api.hap.Characteristic.BatteryLevel)
      .onGet(this.getBatteryLevel.bind(this))
    this.batteryService.getCharacteristic(this.api.hap.Characteristic.ChargingState)
      .onGet(this.getChargingState.bind(this))

    // create a new "ContactSensor" service
    this.contactSensorService = new this.api.hap.Service.ContactSensor(this.name)

    // link methods used when getting or setting the state of the service
    this.contactSensorService.getCharacteristic(this.api.hap.Characteristic.ContactSensorState)
      .onGet(this.getContactSensorState.bind(this))
  }

  // TODO: Properly implement and use proper types (required for Accessories)
  //       https://github.com/J1mbo/homebridge-APC-Back-UPS-HS500/blob/master/index.js
  //       https://github.com/vectronic/homebridge-nut/blob/master/src/nutUpsAccessory.ts

  /**
   * REQUIRED - This must return an array of the services you want to expose.
   * This method must be named "getServices".
   */
  getServices(): Array<Service> {
    this.log.debug('Get Services')

    return [
      this.informationService,
      this.batteryService,
      this.contactSensorService
    ]
  }

  async getStatusLowBattery(): Promise<CharacteristicValue> {
    this.log.info('Get StatusLowBattery')
    const value = Math.floor(Math.random() * 1) // FIXME: Replace with real logic
    // return this.statusLowBattery
    return value
  }

  async getBatteryLevel(): Promise<CharacteristicValue> {
    this.log.info('Get BatteryLevel')
    const value = Math.floor(Math.random() * 100) // FIXME: Replace with real logic
    // return this.batteryLevel
    return value
  }

  async getChargingState(): Promise<CharacteristicValue> {
    this.log.info('Get ChargingState')
    const value = Math.floor(Math.random() * 2) // FIXME: Replace with real logic
    // return this.chargingState
    return value
  }

  async getContactSensorState(): Promise<CharacteristicValue> {
    this.log.info('Get ContactSensorState')
    const value = Math.floor(Math.random() * 1) // FIXME: Replace with real logic
    // return this.contactSensorState
    return value
  }
}
