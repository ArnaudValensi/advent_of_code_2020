const fs = require("fs");

const inputs = fs
  .readFileSync("./input.txt", { encoding: "utf8", flag: "r" })
  .split("\n")
  .filter((item) => item !== "");

const updateRange = (range, isLowerPart) => {
  const half = Math.round((range[1] - range[0]) / 2);

  const newRange = isLowerPart
    ? [range[0], range[1] - half]
    : [range[0] + half, range[1]];

  return newRange;
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

const maxSeatId = inputs.map(getSeatId).sort((x, y) => y - x)[0];

console.log(`Max seat id: ${maxSeatId}`);
