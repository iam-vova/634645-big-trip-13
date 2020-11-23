// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
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

