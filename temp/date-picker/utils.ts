import dayjs, { Dayjs } from 'dayjs';

export function addPrevAdditionalDays(
  additionAddDaysCountPrev: number,
  days: Dayjs[],
  startDate: dayjs.Dayjs,
) {
  let n = additionAddDaysCountPrev;
  while (n) {
    days.push(startDate.subtract(n, 'day'));
    n--;
  }
}

export function addSuffixAdditionalDays(
  additionAddDaysCountSuffix: number,
  days: Dayjs[],
  endDate: dayjs.Dayjs,
) {
  let n = 1;
  while (n <= additionAddDaysCountSuffix) {
    days.push(endDate.add(n, 'day'));
    n++;
  }
  return n;
}

export function computeAllDays(monthFirstDate: Date, monthLastDate: Date): Dayjs[] {
  const startDate = dayjs(monthFirstDate),
    endDate = dayjs(monthLastDate),
    endDay = endDate.get('date'),
    startDateWeek = startDate.get('day'),
    endDateWeek = endDate.get('day'),
    days: Dayjs[] = [];
  const additionAddDaysCountPrev = startDateWeek === 0 ? 6 : startDateWeek - 1,
    additionAddDaysCountSuffix = endDateWeek === 0 ? 0 : 7 - endDateWeek;
  addPrevAdditionalDays(additionAddDaysCountPrev, days, startDate);
  let n = 0;
  while (n < endDay) {
    days.push(startDate.add(n, 'day'));
    n++;
  }
  addSuffixAdditionalDays(additionAddDaysCountSuffix, days, endDate);
  return days;
}

export function convertDaysDate(days: Dayjs[]): Dayjs[][] {
  const result: Dayjs[][] = [];
  while (days.length) {
    const temp: Dayjs[] = [];
    let n = 0;
    while (n < 7) {
      const day = days.shift();
      if (day) {
        temp.push(day);
      }
      n++;
    }
    result.push(temp);
  }
  return result;
}

export function computeMonthStartEndDate(dayjsDate: dayjs.Dayjs) {
  const monthFirstDate = dayjsDate.set('date', 1).toDate();
  const monthLastDate = dayjsDate
    .set('month', dayjsDate.get('month') + 1)
    .set('date', 1)
    .subtract(1, 'day')
    .toDate();
  return { monthFirstDate, monthLastDate };
}
