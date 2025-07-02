import { Buffer } from "node:buffer";

const buf = Buffer.alloc(10);
const buf2 = Buffer.from("Deepanshu Mehra");
buf[10] = 88;
console.log(buf2.toString());
