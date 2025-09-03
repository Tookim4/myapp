// console.log(__dirname);
// console.log(__filename);
// console.log(global);

// global.setTimeout(() => {
//   console.log("3 seconds have passed");
// }, 3000);

// global.setInterval(() => {
//   console.log("1 second has passed");
// }, 1000);

// console.log(process.platform);
// console.log(process.version);

const {fruits, colors} = require("./fruits");

console.log(fruits, colors);

const os = require("os");

console.log(os.platform(), os.homedir(), os.version(), os.hostname());
