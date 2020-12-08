const fs = require("fs");

const inputFile = "./input.txt";
const inputText = fs.readFileSync(inputFile, { encoding: "utf8", flag: "r" });
const inputs = inputText.split("\n").filter((item) => item !== "");

const lineLength = inputs[0].length;

const countTrees = (increment) => {
  let x = 0;
  let y = 0;
  let treeCount = 0;

  while (y < inputs.length - 1) {
    x = (x + increment[0]) % lineLength;
    y = y + increment[1];

    if (inputs[y][x] === "#") {
      treeCount += 1;
    }
  }

  return treeCount;
};

const increments = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const result = increments.reduce((total, increment) => {
  return total * countTrees(increment);
}, 1);

console.log("result: ", result);
