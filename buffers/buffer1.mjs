import { Buffer } from "node:buffer";

// Creating a bufffer of fixed size and then writing into it
const buf1 = new Buffer.alloc(256);
buf1.write("The is Deepanshu Mehra.");

// Creating a buffer from array or string
const buf2 = new Buffer.from("This is Deepanshu Mehra.");
const buf3 = new Buffer.from([21, 9, 2002]);

console.log(buf1);
console.log(buf1.toString());

console.log(buf2);
console.log(buf2.toString());

console.log(buf3);

const sourceBuffer = new Buffer.from("DEEPANSHU");
const targetSource = new Buffer.alloc(10);

sourceBuffer.copy(targetSource);

console.log(targetSource);
console.log(targetSource.toString());
