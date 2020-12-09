const fs = require("fs");

const inputs = fs
  .readFileSync("./input.txt", { encoding: "utf8", flag: "r" })
  .split("\n")
  .filter((item) => item !== "");

const updateRange = (range, isLowerPart) => {
  const half = Math.round((range[1] - range[0]) / 2);

  return isLowerPart
    ? [range[0], range[1] - half]
    : [range[0] + half, range[1]];
};

const getSeatId = (seatNumber) => {
  const row = seatNumber
    .substring(0, 7)
    .split("")
    .map((char) => char === "F")
    .reduce((result, isLowerPart) => updateRange(result, isLowerPart), [
      0,
      127,
    ])[0];

  const colomn = seatNumber
    .substring(7, 10)
    .split("")
    .map((char) => char === "L")
    .reduce((result, isLowerPart) => updateRange(result, isLowerPart), [
      0,
      7,
    ])[0];

  return row * 8 + colomn;
};

const findMissings = (num) => {
  const max = Math.max(...num);
  const min = Math.min(...num);
  const missing = [];

  for (let i = min; i <= max; i++) {
    if (!num.includes(i)) {
      missing.push(i);
    }
  }
  return missing;
};

const seats = inputs.map(getSeatId).sort((x, y) => x - y);
const missingSeats = findMissings(seats);

console.log("missingSeats:", JSON.stringify(missingSeats, null, 2));
