export default {
    "\x00": "NUL",      // Null
    "\x01": "SOH",      // Start of Heading
    "\x02": "STX",      // Start of Text
    "\x03": "ETX",      // End of Text
    "\x04": "EOT",      // End of Transmission
    "\x05": "ENQ",      // Enquiry
    "\x06": "ACK",      // Acknowledge
    "\x07": "BEL",      // Bell
    "\x08": "BS",       // Backspace
    "\x09": "HT",       // Horizontal Tab
    "\x0a": "LF",       // Line Feed
    "\x0b": "VT",       // Vertical Tab
    "\x0c": "FF",       // Form Feed
    "\x0d": "CR",       // Carriage Return
    "\x0e": "SO",       // Shift Out
    "\x0f": "SI",       // Shift In
    "\x10": "DLE",      // Data Link Escape
    "\x11": "DC1",      // Device Control 1
    "\x12": "DC2",      // Device Control 2
    "\x13": "DC3",      // Device Control 3
    "\x14": "DC4",      // Device Control 4
    "\x15": "NAK",      // Negative Acknowledge
    "\x16": "SYN",      // Synchronous Idle
    "\x17": "ETN",      // End of Transmission Block
    "\x18": "CAN",      // Cancel
    "\x19": "EM",       // End of Medium
    "\x1a": "SUB",      // Substitute
    "\x1b": "ESC",      // Escape
    "\x1c": "FS",       // File Separator
    "\x1d": "GS",       // Group Separator
    "\x1e": "RS",       // Record Separator
    "\x1f": "US",       // Unit Separator
    "\x7f": "DEL"       // Delete
}

String.prototype.showCtrlChars = function() {
    var str = this;
    for(var char of Object.entries(chars)){
        str = str.replaceAll(char[0],`[${char[1]}]`);
    }
    return str;
}
