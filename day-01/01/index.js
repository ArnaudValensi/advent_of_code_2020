const fs = require("fs");

const inputFile = "./input.txt";
const inputText = fs.readFileSync(inputFile, { encoding: "utf8", flag: "r" });

const inputs = inputText
  .split("\n")
  .filter((item) => item !== "")
  .map(Number);

const getResult = (inputs) => {
  for (const input1 of inputs) {
    for (const input2 of inputs) {
      if (input1 + input2 === 2020) {
        return input1 * input2;
      }
    }
  }
};

console.log(getResult(inputs));
