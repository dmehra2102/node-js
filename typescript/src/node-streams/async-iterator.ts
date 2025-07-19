async function main() {
  for await (const data of process.stdin) {
    console.log("Data : ", data.toString());
  }
}

main();
