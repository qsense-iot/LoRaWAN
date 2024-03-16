/**
 * Uplink payload decoder for Datacake
 * Usecase: set the report interval to 60 minutes.
 * feel free to change the code for other values.
 * 
 * QSense Technologies Inc.
 *
 * @product EM300-SLD / EM300-ZLD / EM300-MLD
 */

function secondsToLittleEndianBytes(seconds) {
    // Convert seconds to a hexadecimal string
    var hexString = seconds.toString(16);

    // Ensure the hex string is 4 characters long, padding with zeros if necessary
    while (hexString.length < 4) {
        hexString = '0' + hexString;
    }

    // Split the hex string into two-byte parts and convert them to integers
    var lowByte = parseInt(hexString.substring(2, 4), 16);
    var highByte = parseInt(hexString.substring(0, 2), 16);

    // Return the bytes in Little-Endian format
    return [lowByte, highByte];
}
// the port number must be set to 85
function Encoder(port) {
    // Convert minutes to seconds (default value is 60 minutes)
    var minutes = 60;
    var seconds = minutes * 60;

    // Convert seconds to a Little-Endian byte array
    var payloadBytes = secondsToLittleEndianBytes(seconds);

    // Construct and return the payload array, with predefined bytes
    return [0xff, 0x03].concat(payloadBytes);
}
