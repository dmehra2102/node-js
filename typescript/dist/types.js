"use strict";
// In this file we are using all types that typescript provides
// 1. number
const age = 22;
const price = 19.99;
// 2. string
const myName = "Deepanshu Mehra";
const greeting = `Hello, ${myName}`;
// 3. boolean
const isActive = true;
const hasPermission = false;
// 4. null with union type
const date = null;
// 5. undefined with union type
const value = undefined;
// 6. symbol
const uniqueID = Symbol("Deepanshu");
// 7. bigInt
const bigNumber = 9007199254740991n; // Note the 'n' suffix
// 8. object
let myObj = { name: "Deepanshu" };
myObj = [1, 2, 3, 4];
// 9. Array<Type> or Type[]
const numArray = [2, 1, 2, 4];
const arr = ["Deepanshu", "Mehra"];
// 10. tuple
const mixArr = ["Deepanshu", "Mehra", 22];
// 11. enum
var Days;
(function (Days) {
    Days[Days["Monday"] = 0] = "Monday";
    Days[Days["TuesDay"] = 1] = "TuesDay";
    Days[Days["Wednesday"] = 2] = "Wednesday";
    Days[Days["Thruesday"] = 3] = "Thruesday";
    Days[Days["Friday"] = 4] = "Friday";
    Days[Days["Saturday"] = 5] = "Saturday";
    Days[Days["Sunday"] = 6] = "Sunday";
})(Days || (Days = {}));
const today = Days.Friday;
console.log(today);
//# sourceMappingURL=types.js.map