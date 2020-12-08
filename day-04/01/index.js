const fs = require("fs");

const requiredFields = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
const inputFile = "./input.txt";
const inputText = fs.readFileSync(inputFile, { encoding: "utf8", flag: "r" });
const inputs = inputText
  .split("\n\n")
  .map((input) => input.replace(/\n/g, " "));

const passports = inputs.map((input) => {
  return input.split(" ").map((input) => input.replace(/:.*$/, ""));
});

const isValid = (passport) =>
  requiredFields.reduce((isValid, field) => {
    return isValid && passport.includes(field);
  }, true);

const nbValidPassports = passports.reduce((total, passport) => {
  return total + (isValid(passport) ? 1 : 0);
}, 0);

console.log("nbValidPassports: ", nbValidPassports);
