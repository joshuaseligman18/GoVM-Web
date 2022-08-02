// Function that converts a base 10 number into a hex string
export function hexString(num, minLength) {
    // Get the basic conversion
    let conv = num.toString(16).toUpperCase()
    // Add padded 0s if needed
    if (conv.length < minLength) {
        let diff = minLength - conv.length
        conv = "0".repeat(diff) + conv
    }
    conv = "0x" + conv
    return conv
}