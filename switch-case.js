const extension = ".md";
switch (extension) {
  case ".doc":
    console.log("This extension .doc will be deprecated soon");
  case ".pdf":
  case ".md":
  case ".svg":
    console.log("Congratulations! You can open this file");
    break;
  default:
    console.log(`${extension} is not supported`);
}

// Creating arrays using different ways
const arr1 = Array.of(1, 2, 3, 4);
console.log("Array 1 : %o", arr1);

const arr2 = Array.from("Deepanshu");
console.log("Array 2 :", arr2);

const arr3 = Array.from([2, 3, 4, 5], (x) => x * x);
console.log("Array 3 :", arr3);

let arr = [1, 2, 2, 3, 1, 4, 5, 4, 5];
let set = new Set(arr);
console.log("Set : ", set, set.values());

const p2 = await Promise.all([1, 2, 3, Promise.resolve(444)]);
console.log("Promises-1 :", p2);
const p3 = await Promise.allSettled([
  1,
  2,
  3,
  Promise.reject(new Error("bad")),
  5,
  6,
]);
console.log("Promises-2 : ", p3);
