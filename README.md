# LoRaWAN Device Decoders Repository

## Overview

Welcome to the LoRaWAN Device Decoders Repository! This repository is a collection of decoder scripts designed to interpret the payload data from various LoRaWAN devices into human-readable formats.

## Getting Started

To use these decoders, clone this repository to your local machine or directly integrate with your network server application.

```bash
git clone https://github.com/qsense-iot/LoRaWAN.git
```
## Directory Structure
```bash
/decoders
    /brand-a
        /device-model-1
            /downlink
                -decoder.js
            /uplink
                - decoder.js
    /brand-b
        /device-model-1
            /downlink
                - decoder.js
            /uplink
                -decoder.js
```

## How to Use
1. **Navigate to the specific brand and model directory.**
2. **Use the decoder script provided for that device model.**


## Contributing

### We welcome contributions from the community. If you have a decoder script for a device not currently listed, please feel free to submit it.

1. Fork the repository.
2. Create a feature branch (git checkout -b new-decoder).
3. Commit your changes (git commit -am 'Add some decoder').
4. Push to the branch (git push origin new-decoder).
5. Create a new Pull Request.

## Support

For support, please open an issue in the repository, and a maintainer will assist you.


## License

This project is licensed under the MIT License - see the LICENSE file for details.
