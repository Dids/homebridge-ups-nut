<!--[![verified-by-homebridge](https://badgen.net/badge/homebridge/verified/purple)](https://github.com/homebridge/homebridge/wiki/Verified-Plugins)-->

# homebridge-ups-nut

HomeKit battery status information for various UPS devices. Uses [NUT](https://networkupstools.org/) for communication.

# Installation

Follow the instruction in [homebridge](https://www.npmjs.com/package/homebridge) for the homebridge server installation.
The plugin is published through [NPM](https://www.npmjs.com/package/homebridge-ups-nut) and should be installed "globally" by typing:

> npm install -g homebridge-ups-nut

# Configuration

Supports configuration via either the `config.json` file in Homebridge or via the HomeBridge configuration UI.

IP address is required, while username and password are optional. See [config.schema.json](config.schema.json) for more details.
