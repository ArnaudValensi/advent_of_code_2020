const fs = require("fs");

const inputFile = "./input.txt";
const inputText = fs.readFileSync(inputFile, { encoding: "utf8", flag: "r" });
const inputs = inputText.split("\n").filter((item) => item !== "");

const regex = /^(\d+)-(\d+) (\w): (.+)$/;

const result = inputs.reduce((total, input) => {
  const [, first, second, char, password] = input.match(regex);

  const isFirstCharEqual = password[first - 1] === char;
  const isSecondCharEqual = password[second - 1] === char;

  if (isFirstCharEqual !== isSecondCharEqual) {
    return total + 1;
  }
  return total;
}, 0);

console.log(result);
