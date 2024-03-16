//Sample payload: 01755C03673401046865050000

/**
 * Payload Decoder for Datacake
 * based on Payload Decoder for Chirpstack v4
 * Copyright 2023 Milesight IoT
 *
 * @product EM300-SLD / EM300-ZLD / EM300-MLD
 */
function Decoder(bytes, port) {
  return milesight(bytes);
}

function milesight(bytes) {
  var decoded = {};

  for (var i = 0; i < bytes.length; ) {
    var channel_id = bytes[i++];
    var channel_type = bytes[i++];
    // BATTERY
    if (channel_id === 0x01 && channel_type === 0x75) {
      decoded.battery = bytes[i];
      i += 1;
    }
    // TEMPERATURE
    else if (channel_id === 0x03 && channel_type === 0x67) {
      // ℃
      decoded.temperature = readInt16LE(bytes.slice(i, i + 2)) / 10;
      i += 2;

      // ℉
      // decoded.temperature = readInt16LE(bytes.slice(i, i + 2)) / 10 * 1.8 + 32;
      // i +=2;
    }
    // HUMIDITY
    else if (channel_id === 0x04 && channel_type === 0x68) {
      decoded.humidity = bytes[i] / 2;
      i += 1;
    }
    // LEAKAGE STATUS
    else if (channel_id === 0x05 && channel_type === 0x00) {
      decoded.leakage_status = bytes[i] === 0 ? 'normal' : 'leak';
      decoded.leakage_boolean = bytes[i] === 0 ? 0 : 1;
      i += 1;
    }
    // TEMPERATURE, HUMIDITY & LEAKAGE STATUS HISTROY
    else if (channel_id === 0x20 && channel_type === 0xce) {
      var point = {};
      decoded.type = 'HISTORY';
      decoded.timestamp = readUInt32LE(bytes.slice(i, i + 4));
      decoded.temperature = readInt16LE(bytes.slice(i + 4, i + 6)) / 10;
      decoded.humidity = bytes[i + 6] / 2;
      decoded.leakage_status = bytes[i + 7] === 0 ? 'normal' : 'leak';

      i += 8;
    } else {
      break;
    }
  }

  // Test for LoRa properties in normalizedPayload
  try {
    decoded.lora_rssi =
      (!!normalizedPayload.gateways &&
        Array.isArray(normalizedPayload.gateways) &&
        normalizedPayload.gateways[0].rssi) ||
      0;
    decoded.lora_snr =
      (!!normalizedPayload.gateways &&
        Array.isArray(normalizedPayload.gateways) &&
        normalizedPayload.gateways[0].snr) ||
      0;
    decoded.lora_datarate = normalizedPayload.data_rate || 'not retrievable';
  } catch (error) {
    console.log('Error occurred while decoding LoRa properties: ' + error);
  }

  return decoded;
}

/* ******************************************
 * bytes to number
 ********************************************/
function readUInt16LE(bytes) {
  var value = (bytes[1] << 8) + bytes[0];
  return value & 0xffff;
}

function readInt16LE(bytes) {
  var ref = readUInt16LE(bytes);
  return ref > 0x7fff ? ref - 0x10000 : ref;
}

function readUInt32LE(bytes) {
  var value = (bytes[3] << 24) + (bytes[2] << 16) + (bytes[1] << 8) + bytes[0];
  return (value & 0xffffffff) >>> 0;
}
