import {ONE_DAY, ONE_HOUR} from "../const";
import dayjs from "dayjs";
import {getEventDuration} from "./common";

export const getDurationTime = (time) => {
  const timsMs = time.asMilliseconds();
  if (timsMs <= ONE_HOUR) {
    return time.get(`minutes`) + `M`;
  } else if (timsMs <= ONE_DAY) {
    return time.get(`hours`) + `H ` + time.get(`minutes`) + `M`;
  } else {
    return time.get(`days`) + `D ` + time.get(`hours`) + `H ` + time.get(`minutes`) + `M`;
  }
};

const getWeightForNullDate = (dataA, dataB) => {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;
};

export const sortEventsByDay = (eventA, eventB) => {
  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

  if (weight !== null) {
    return weight;
  }

  return dayjs(eventA.dateFrom).diff(dayjs(eventB.dateFrom));
};

export const sortEventsByTime = (eventA, eventB) => {
  const durationEventA = getEventDuration(eventA.dateFrom, eventA.dateTo).asMilliseconds();
  const durationEventB = getEventDuration(eventB.dateFrom, eventB.dateTo).asMilliseconds();

  const weight = getWeightForNullDate(eventA.dateFrom, eventB.dateFrom);

  if (weight !== null) {
    return weight;
  }

  return durationEventB - durationEventA;
};

export const sortEventsByPrice = (eventA, eventB) => {
  const weight = getWeightForNullDate(eventA.cost, eventB.cost);

  if (weight !== null) {
    return weight;
  }
  return eventB.cost - eventA.cost;
};

