import React from "react";
import { FC } from "react";
import "./date-picker.scss";
import HoverPanel from "../common/component/hover-panel/hover-panel";
import Input from "../input/input";
import dayjs from "dayjs";
import makeClassByPrefix, {
  makeComponentPrefixClass,
} from "../common/utils/makeClassByPrefix";

const weeks = ["一", "二", "三", "四", "五", "六", "日"];
const addClassByPrefix = makeClassByPrefix(
  makeComponentPrefixClass("date-picker")
);

function computeMonthStartEndDate(dayjsDate: dayjs.Dayjs) {
  const monthFirstDate = dayjsDate.set("date", 1).toDate();
  const monthLastDate = dayjsDate
    .set("month", dayjsDate.get("month") + 1)
    .set("date", 1)
    .subtract(1, "day")
    .toDate();
  return { monthFirstDate, monthLastDate };
}

function addPrevAdditionalDays(
  additionAddDaysCountPrev: number,
  days: Date[],
  startDate: dayjs.Dayjs
) {
  let n = additionAddDaysCountPrev;
  while (n) {
    days.push(startDate.subtract(n, "day").toDate());
    n--;
  }
}

function addSuffixAdditionalDays(
  additionAddDaysCountSuffix: number,
  days: Date[],
  endDate: dayjs.Dayjs
) {
  let n = 1;
  while (n <= additionAddDaysCountSuffix) {
    days.push(endDate.add(n, "day").toDate());
    n++;
  }
  return n;
}

function computeAllDays(monthFirstDate: Date, monthLastDate: Date): Date[] {
  const startDate = dayjs(monthFirstDate),
    endDate = dayjs(monthLastDate),
    endDay = endDate.get("date"),
    startDateWeek = startDate.get("day"),
    endDateWeek = endDate.get("day"),
    days: Date[] = [];
  const additionAddDaysCountPrev = startDateWeek === 0 ? 6 : startDateWeek - 1,
    additionAddDaysCountSuffix = endDateWeek === 0 ? 0 : 7 - endDateWeek;
  addPrevAdditionalDays(additionAddDaysCountPrev, days, startDate);
  addSuffixAdditionalDays(additionAddDaysCountSuffix, days, endDate);
  let n = 0;
  while (n < endDay) {
    days.push(startDate.add(n, "day").toDate());
    n++;
  }
  return days;
}

function convertDaysDate(days: Date[]) {
  const result: Date[][] = [];
  while (days.length) {
    const temp: Date[] = [];
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

const Content: FC<{
  date: Date;
}> = ({ date }) => {
  const year = date.getFullYear(),
    dayjsDate = dayjs(date),
    month = dayjsDate.get("month") + 1;
  // 计算出本月第一天和最后一天
  const { monthFirstDate, monthLastDate } = computeMonthStartEndDate(dayjsDate);
  // 将本月的日期全部放入数组
  const daysList = computeAllDays(monthFirstDate, monthLastDate);
  const days = convertDaysDate(daysList);
  console.log(days);
  // 根据本月日期始末补充开头和结尾日期
  return (
    <div className={addClassByPrefix("days")}>
      <div className={addClassByPrefix("days-header")}>
        <div className={addClassByPrefix("days-header-current-date")}>
          <span>{year}年</span>
          <span className={addClassByPrefix("days-header-current-date-month")}>
            {month}月
          </span>
        </div>
      </div>
      <div className={addClassByPrefix("days-content")}>
        <table>
          <thead>
            <tr>
              {weeks.map((item) => {
                return <th key={item}>{item}</th>;
              })}
            </tr>
          </thead>
          <tbody>
            {days.map((dayList) => {
              return (
                <tr>
                  {dayList.map((day) => {
                    return <td>{dayjs(day).get('date')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={addClassByPrefix("days-footer")}>footer</div>
    </div>
  );
};

const DatePicker: FC = () => {
  return (
    <>
      <HoverPanel overlay={<Content date={new Date()} />}>
        <div style={{ width: "200px" }}>
          <Input />
        </div>
      </HoverPanel>
    </>
  );
};

export default DatePicker;
