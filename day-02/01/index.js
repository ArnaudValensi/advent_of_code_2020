const fs = require("fs");

const inputFile = "./input.txt";
const inputText = fs.readFileSync(inputFile, { encoding: "utf8", flag: "r" });
const inputs = inputText.split("\n").filter((item) => item !== "");

const regex = /^(\d+)-(\d+) (\w): (.+)$/;
const charCount = (str, char) => str.split(char).length - 1;

const result = inputs.reduce((total, input) => {
  const [, min, max, char, password] = input.match(regex);
  const count = charCount(password, char);

  if (count >= min && count <= max) {
    return total + 1;
  }
  return total;
}, 0);

console.log(result);
