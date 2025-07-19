//  Non-Flowing Mode
process.stdin
  .setEncoding("utf8")
  .on("readable", () => {
    let chunk: string;
    console.log("New Data Available");
    while ((chunk = process.stdin.read()) !== null) {
      console.log(chunk);
    }
  })
  .on("end", () => {
    console.log("End of stream");
  });

//  Flowing Mode
process.stdin
  .setEncoding("utf8")
  .on("data", (data: string) => {
    console.log(data);
  })
  .on("end", () => console.log("End of stream"));
