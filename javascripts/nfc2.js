async function readTag() {
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.scan();
        ndef.onreading = event => {
            consoleLog("Serial number:  " + event.serialNumber);
            const decoder = new TextDecoder();
            consoleLog("Record 1 content:  " + decoder.decode(event.message.records[0].data));
            consoleLog("Record 2 content:  " + decoder.decode(event.message.records[1].data));
            consoleLog("Record 3 content:  " + decoder.decode(event.message.records[2].data));
            consoleLog("Record 4 content:  " + decoder.decode(event.message.records[3].data));
            consoleLog("Record 5 content:  " + decoder.decode(event.message.records[4].data));
        
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
  
  async function writeTag() {
    if ("NDEFReader" in window) {
      const ndef = new NDEFReader();
      try {
        await ndef.write("What Web Can Do Today");
        consoleLog("NDEF message written!");
      } catch(error) {
        consoleLog(error);
      }
    } else {
      consoleLog("Web NFC is not supported.");
    }
  }
  
  function consoleLog(data) {
    var logElement = document.getElementById('log');
    logElement.innerHTML += data + '\n';
  }