// const array = [1, 2, 4, 5, 6];

// const [a, b, ...{ pop, push }] = array;
// const [x, y, ...[c, d]] = array;

// console.log(a, b);
// console.log(x, y, c, d);

const obj = {
  a: "23",
};
const key = "a";
const { [key]: b } = obj;

console.log(b);
