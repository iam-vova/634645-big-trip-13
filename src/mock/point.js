import dayjs from "dayjs";
import {getRandomInteger, arrayShuffle} from "../utils/common";
import {generateExtraOptions} from "./extra-options";

const generatePointType = () => {
  const types = [
    `Taxi`,
    `Bus`,
    `Train`,
    `Ship`,
    `Transport`,
    `Drive`,
    `Flight`,
    `Check-in`,
    `Sightseeing`,
    `Restaurant`
  ];

  const randomIndex = getRandomInteger(0, types.length - 1);

  return types[randomIndex];
};

const destinationDescriptionFull = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. ` +
  `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. ` +
  `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. ` +
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit,` +
  ` eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed ` +
  `augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. ` +
  `In rutrum ac purus sit amet tempus.`;

const generateDestination = () => {
  const destinationPicsMax = 5;
  const destinations = [
    `Amsterdam`,
    `Chamonix`,
    `Geneva`
  ];

  const destinationDescription = arrayShuffle(destinationDescriptionFull.split(`.`)).map((s) => s.trim()).slice(1, getRandomInteger(1, 5)).join(`. `) + `.`;
  const randomIndex = getRandomInteger(0, destinations.length - 1);
  const destionationPics = [];
  for (let i = getRandomInteger(0, destinationPicsMax); i--;) {
    destionationPics.push(`http://picsum.photos/248/152?r=${i}`);
  }

  return {'destination': destinations[randomIndex], 'description': destinationDescription, 'pics': destionationPics};
};

const tripStartDate = dayjs().add(3, `month`).toDate();
let pointStartDate = tripStartDate;
let pointEndDate;

const generateDate = () => {
  const maxHoursGap = 24;
  const hoursGap = getRandomInteger(1, maxHoursGap);

  const maxDaysGap = 2;
  const daysGap = getRandomInteger(0, maxDaysGap);

  pointEndDate = dayjs(pointStartDate).add(daysGap, `day`).add(hoursGap, `hour`).toDate();
  pointStartDate = pointEndDate;

  return pointEndDate;
};

export const generatePoint = () => {
  const EXTRA_OPTIONS_COUNT = getRandomInteger(0, 5);

  return {
    type: generatePointType(),
    destination: generateDestination(),
    dateFrom: tripStartDate,
    dateTo: generateDate(),
    cost: getRandomInteger(1, 50),
    extraOptions: generateExtraOptions(EXTRA_OPTIONS_COUNT),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
