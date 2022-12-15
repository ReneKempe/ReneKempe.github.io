const ndef = new NDEFReader();
await ndef.scan();
ndef.onreading = async ({ message }) => {
  if (message.records.length == 0 ||               // unformatted tag
      message.records[0].recordType == "empty") {  // empty record
    await ndef.write({
      records: [{ recordType: "text", data: "Hello World" }]
    });
    return;
  }

  const decoder = new TextDecoder();
  for (const record of message.records) {
    switch (record.recordType) {
      case "text":
        const textDecoder = new TextDecoder(record.encoding);
        console.log(`Text: ${textDecoder.decode(record.data)} (${record.lang})`);
        break;
      case "url":
        console.log(`URL: ${decoder.decode(record.data)}`);
        break;
      case "mime":
        if (record.mediaType === "application/json") {
          console.log(`JSON: ${JSON.parse(decoder.decode(record.data))}`);
        }
        else if (record.mediaType.startsWith("image/")) {
          const blob = new Blob([record.data], { type: record.mediaType });

          const img = document.createElement("img");
          img.src = URL.createObjectURL(blob);
          img.onload = () => window.URL.revokeObjectURL(this.src);

          document.body.appendChild(img);
        }
        else {
          console.log(`Media not handled`);
        }
        break;
      default:
        console.log(`Record not handled`);
    }
  }
};