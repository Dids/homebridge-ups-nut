import { AccessoryConfig, API, Logger, PlatformAccessory } from 'homebridge'

export interface IUPSAccessory extends Partial<PlatformAccessory> {
  readonly log: Logger
  readonly config: AccessoryConfig
  readonly api: API

  // TODO: Properly implement and use proper types (required for Accessories)
  //       https://github.com/J1mbo/homebridge-APC-Back-UPS-HS500/blob/master/index.js
  getServices(): any
}

export class UPSAccessory implements IUPSAccessory {
  readonly log: Logger
  readonly config: AccessoryConfig
  readonly api: API

  constructor(log: Logger, config: AccessoryConfig, api: API) {
    this.log = log
    this.config = config
    this.api = api
  }

  // TODO: Properly implement and use proper types (required for Accessories)
  //       https://github.com/J1mbo/homebridge-APC-Back-UPS-HS500/blob/master/index.js
  getServices(): any {
    return []
  }
}
