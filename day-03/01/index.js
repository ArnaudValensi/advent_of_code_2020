const fs = require("fs");

const inputFile = "./input.txt";
const inputText = fs.readFileSync(inputFile, { encoding: "utf8", flag: "r" });
const inputs = inputText.split("\n").filter((item) => item !== "");

const lineLength = inputs[0].length;

let x = 0;
let y = 0;
let treeCount = 0;

while (y < inputs.length - 1) {
  x = (x + 3) % lineLength;
  y = y + 1;

  if (inputs[y][x] === "#") {
    treeCount += 1;
  }
}

console.log("treeCount: ", treeCount);
