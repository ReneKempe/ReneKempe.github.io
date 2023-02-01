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
            consoleLog("Record 2 (Product Info 1):  " + decoder.decode(event.message.records[2].data)); consoleLog(validateProductInfo1(decoder.decode(event.message.records[2].data)));
            consoleLog("Record 3 (Signature):  " + decoder.decode(event.message.records[3].data)); consoleLog(validateSignature(decoder.decode(event.message.records[3].data)));
            consoleLog("Record 5 (Product Info 2):  " + decoder.decode(event.message.records[4].data)); consoleLog(validateProductInfo2(decoder.decode(event.message.records[4].data)));
        
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
    return str.match(/^https:\/\/www\.sanofi\.com\/nfc-label-platform$/i) !== null; //e.g. sanofi.com/nfc-label-platform
}

function validateDataInfo(str){
  return str.match(/^1[a-zA-Z][A-Za-z0-9]{3}%{0,3}$/i) !== null; // 1Akey%% e.g. 1AKic%%
}

function validateProductInfo1(str){
  return str.match(/^2[0-9a-fA-F]{14}01\d{14}$/i) !== null; // 2NFCUID#NFCUID#01GTINNUMGTINNUM e.g. 2040108198AC1610104030685988887
}

function validateSignature(str){
  return str.match(/^3[A-Za-z0-9+\/]{64}$/i) !== null; // 3SignaturSignaturSignaturSignaturSignaturSignaturSignaturSignatur e.g. 3SEt1icPWEop+0mT4wgIyw5Axpyt8tyeEjsIW3jZSFM+5nV2Q4dVcWyLoG02tV0AV
}

function validateProductInfo2(str){
  return str.match(/^511(\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))17(\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01]))10[a-zA-Z0-9_]{8}$/i) !== null; // 511MFDATE17EXPIRY10LOTNUMBR e.g. 5112206301723123110__2F000A
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