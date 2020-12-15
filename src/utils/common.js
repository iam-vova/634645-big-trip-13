import dayjs from "dayjs";

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const arrayShuffle = (array) => {
  let l;
  let temp;
  for (let k = array.length - 1; k--;) {
    l = getRandomInteger(0, array.length - 1);
    temp = array[l];
    array[l] = array[k];
    array[k] = temp;
  }
  return array;
};

export const getFormatedDate = (date, format) => {
  return date !== null ? dayjs(date).format(format) : ``;
};

export const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1)
  ];
};

