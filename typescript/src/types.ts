// In this file we are using all types that typescript provides

// 1. number
const age: number = 22;
const price: number = 19.99;

// 2. string
const myName: string = "Deepanshu Mehra";
const greeting: string = `Hello, ${myName}`;

// 3. boolean
const isActive: boolean = true;
const hasPermission: boolean = false;

// 4. null with union type
const date: string | null = null;

// 5. undefined with union type
const value: number | undefined = undefined;

// 6. symbol
const uniqueID: symbol = Symbol("Deepanshu");

// 7. bigInt
const bigNumber: bigint = 9007199254740991n; // Note the 'n' suffix

// 8. object
let myObj: object = { name: "Deepanshu" };
myObj = [1, 2, 3, 4];

// 9. Array<Type> or Type[]
const numArray: Array<Number> = [2, 1, 2, 4];
const arr: string[] = ["Deepanshu", "Mehra"];

// 10. tuple
const mixArr: [string, string, number, number?] = ["Deepanshu", "Mehra", 22];

// 11. enum
enum Days {
  Monday,
  TuesDay,
  Wednesday,
  Thruesday,
  Friday,
  Saturday,
  Sunday,
}
const today: Days = Days.Friday;
console.log(today);
