import {ONE_DAY, ONE_HOUR} from "../const";

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
