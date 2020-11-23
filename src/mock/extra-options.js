import {getRandomInteger, arrayShuffle} from "../utils/common";

const optionTitles = [
  `Add luggage`,
  `Switch to comfort class`,
  `Add meal`,
  `Choose seats`,
  `Travel by train`
];

const extraOptionsCostMin = 5;
const extraOptionsCostMax = 150;

const generateExtraOption = (optionName) => {
  return {
    name: optionName,
    cost: getRandomInteger(extraOptionsCostMin, extraOptionsCostMax)
  };
};

export const generateExtraOptions = (count) => {
  let optionsTitlesCopy = arrayShuffle(optionTitles.slice());

  return new Array(count)
    .fill(``)
    .map(() => {return generateExtraOption(optionsTitlesCopy.shift())});
};
