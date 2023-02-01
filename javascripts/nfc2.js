async function readTag() {
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.scan();
        ndef.onreading = event => {
            consoleLog("Serial number:  " + event.serialNumber);
            const decoder = new TextDecoder();
            consoleLog("Record 0 (URI):  " + decoder.decode(event.message.records[0].data)); consoleLog(validateURL(decoder.decode(event.message.records[0].data)));
            consoleLog("Record 1 (Data Info):  " + decoder.decode(event.message.records[1].data)); consoleLog(validateDataInfo(decoder.decode(event.message.records[1].data)));
            consoleLog("Record 2 (Product Info 1):  " + decoder.decode(event.message.records[2].data));
            consoleLog("Record 3 (Signature):  " + decoder.decode(event.message.records[3].data));
            consoleLog("Record 5 (Product Info 2):  " + decoder.decode(event.message.records[4].data)); consoleLog(validateMD(decoder.decode(event.message.records[4].data)));
        
        //   for (const record of event.message.records) {
        //     consoleLog("Record type:  " + record.recordType);
        //    // consoleLog("MIME type:    " + record.mediaType);
        //     consoleLog("=== data ===\n" + decoder.decode(record.data));
        //   }
        }
      } catch(error) {
        consoleLog(error);
      }
    } else {
      consoleLog("Web NFC is not supported.");
    }
  }
  
//not working yet:
function validateURL(str){
    return str.match(/^https:\/\/www\.sanofi\.com\/nfc-label-platform$/i) !== null;
}
function validateDataInfo(str){
  return str.match(/^1[a-zA-Z][A-Za-z0-9][A-Za-z0-9][A-Za-z0-9]%%$/i) !== null;
}
function validateMD(str){
  return str.match(/^[0-9]+__\d[a-zA-Z]\d\d\d[a-zA-Z]$/i) !== null; //e.g. 5112206301723123110__2F000A
}

  // async function writeTag() {
  //   if ("NDEFReader" in window) {
  //     const ndef = new NDEFReader();
  //     try {
  //       await ndef.write("What Web Can Do Today");
  //       consoleLog("NDEF message written!");
  //     } catch(error) {
  //       consoleLog(error);
  //     }
  //   } else {
  //     consoleLog("Web NFC is not supported.");
  //   }
  // }
  
  function consoleLog(data) {
    var logElement = document.getElementById('log');
    logElement.innerHTML += data + '\n';
  }