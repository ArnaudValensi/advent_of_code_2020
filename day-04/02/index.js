const fs = require("fs");

const inputFile = "./input.txt";
const inputText = fs.readFileSync(inputFile, { encoding: "utf8", flag: "r" });
const inputs = inputText
  .split("\n\n")
  .map((input) => input.replace(/\n/g, " "));

// Convert inputs to the following structure:
//
// [
//   {
//     "hcl": "a3c52a",
//     "iyr": "2025",
//     "byr": "2023",
//     "hgt": "182cm",
//     "ecl": "#be1503",
//     "pid": "9311657615",
//     "eyr": "2005"
//   },
//   ...
// ]
const passports = inputs.map((input) => {
  return input.split(" ").reduce((passport, input) => {
    const [key, value] = input.split(":");
    return {
      ...passport,
      [key]: value,
    };
  }, {});
});

// Validation functions.
const byr = (passport) => {
  const value = Number(passport["byr"]);
  return !Number.isNaN(value) && value >= 1920 && value <= 2002;
};

const iyr = (passport) => {
  const value = Number(passport["iyr"]);
  return !Number.isNaN(value) && value >= 2010 && value <= 2020;
};

const eyr = (passport) => {
  const value = Number(passport["eyr"]);
  return !Number.isNaN(value) && value >= 2020 && value <= 2030;
};

const hgt = (passport) => {
  const matches = passport["hgt"] && passport["hgt"].match(/^(\d+)(in|cm)$/);

  if (!matches) {
    return false;
  }

  const [, size, unit] = matches;

  if (unit === "cm") {
    return size >= 150 && size <= 193;
  } else {
    return size >= 59 && size <= 76;
  }
};

const hcl = (passport) => {
  return passport["hcl"] && passport["hcl"].match(/^#[0-9a-f]{6}$/) !== null;
};

const ecl = (passport) => {
  return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(
    passport["ecl"]
  );
};

const pid = (passport) => {
  return passport["pid"] && passport["pid"].match(/^\d{9}$/) !== null;
};

// All validations.
const validations = [byr, iyr, eyr, hgt, hcl, ecl, pid];

const checkPassport = (passport) =>
  validations.reduce((isValid, validation) => {
    return isValid && validation(passport);
  }, true);

const nbValidPassports = passports.reduce((total, passport) => {
  return total + (checkPassport(passport) ? 1 : 0);
}, 0);

console.log("nbValidPassports: ", nbValidPassports);
