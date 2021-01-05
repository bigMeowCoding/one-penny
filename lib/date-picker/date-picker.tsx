import React, { useContext, useState } from "react";
import { FC } from "react";
import "./date-picker.scss";
import HoverPanel from "../common/component/hover-panel/hover-panel";
import Input from "../input/input";
import dayjs, { Dayjs } from "dayjs";
import makeClassByPrefix, {
  makeComponentPrefixClass,
} from "../common/utils/makeClassByPrefix";
import Icon from "../icon/icon";
import { HoverPanelContext } from "../common/config/context";
type OnChangeType = (date: Date) => void;
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
  days: Dayjs[],
  startDate: dayjs.Dayjs
) {
  let n = additionAddDaysCountPrev;
  while (n) {
    days.push(startDate.subtract(n, "day"));
    n--;
  }
}

function addSuffixAdditionalDays(
  additionAddDaysCountSuffix: number,
  days: Dayjs[],
  endDate: dayjs.Dayjs
) {
  let n = 1;
  while (n <= additionAddDaysCountSuffix) {
    days.push(endDate.add(n, "day"));
    n++;
  }
  return n;
}

function computeAllDays(monthFirstDate: Date, monthLastDate: Date): Dayjs[] {
  const startDate = dayjs(monthFirstDate),
    endDate = dayjs(monthLastDate),
    endDay = endDate.get("date"),
    startDateWeek = startDate.get("day"),
    endDateWeek = endDate.get("day"),
    days: Dayjs[] = [];
  const additionAddDaysCountPrev = startDateWeek === 0 ? 6 : startDateWeek - 1,
    additionAddDaysCountSuffix = endDateWeek === 0 ? 0 : 7 - endDateWeek;
  addPrevAdditionalDays(additionAddDaysCountPrev, days, startDate);
  let n = 0;
  while (n < endDay) {
    days.push(startDate.add(n, "day"));
    n++;
  }
  addSuffixAdditionalDays(additionAddDaysCountSuffix, days, endDate);
  return days;
}

function convertDaysDate(days: Dayjs[]): Dayjs[][] {
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

const Content: FC<{
  date: Date;
  onChange: OnChangeType;
}> = ({ date, onChange }) => {
  const [dayjsDate, setDayjsDate] = useState<Dayjs>(dayjs(date));
  const year = dayjsDate.get("year"),
    month = dayjsDate.get("month") + 1;
  // 计算出本月第一天和最后一天
  const { monthFirstDate, monthLastDate } = computeMonthStartEndDate(dayjsDate);
  // 将本月的日期全部放入数组
  const daysList = computeAllDays(monthFirstDate, monthLastDate);
  // 根据本月日期始末补充开头和结尾日期
  const days = convertDaysDate(daysList);
  const context = useContext(HoverPanelContext);
  return (
    <div className={addClassByPrefix("days")}>
      <div className={addClassByPrefix("days-header")}>
        <div>
          <Icon
            name="double-arrow-left"
            onClick={() => {
              const currentMonth = dayjsDate.get("month");
              setDayjsDate(
                dayjsDate
                  .subtract(1, "year")
                  .set("month", currentMonth)
                  .set("date", 1)
              );
            }}
          />
          <Icon
            name="arrow-left"
            onClick={() => {
              setDayjsDate(dayjsDate.subtract(1, "month").set("date", 1));
            }}
          />
        </div>
        <div className={addClassByPrefix("days-header-current-date")}>
          <span>{year}年</span>
          <span className={addClassByPrefix("days-header-current-date-month")}>
            {month}月
          </span>
        </div>
        <div>
          <Icon
            name="arrow-right"
            onClick={() => {
              setDayjsDate(dayjsDate.add(1, "month").set("date", 1));
            }}
          />
          <Icon
            name="double-arrow-right"
            onClick={() => {
              const currentMonth = dayjsDate.get("month");
              setDayjsDate(
                dayjsDate
                  .add(1, "year")
                  .set("month", currentMonth)
                  .set("date", 1)
              );
            }}
          />
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
            {days.map((dayList, index) => {
              return (
                <tr key={index}>
                  {dayList.map((day, dayIndex) => {
                    return (
                      <td
                        key={dayIndex}
                        onClick={() => {
                          onChange(day.toDate());
                          context.closePanel();
                        }}
                        className={
                          day.get("month") !== dayjsDate.get("month")
                            ? "other-month"
                            : ""
                        }
                      >
                        {day.get("date")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={addClassByPrefix("days-footer")}>
        <a href="#">今天</a>
      </div>
    </div>
  );
};

const DatePicker: FC<{
  onChange: OnChangeType;
}> = ({ onChange }) => {
  const [value, setValue] = useState<string>("");
  console.log(value);
  return (
    <>
      <HoverPanel
        style={{ width: "280px" }}
        overlay={
          <Content
            date={value?new Date(value):new Date()}
            onChange={(date) => {
              const val = dayjs(date).format("YYYY-MM-DD");
              setValue(val);
              console.log(val);
              onChange(date);
            }}
          />
        }
      >
        <div style={{ width: "200px" }}>
          <Input
            value={value}
            onChange={(val) => {
              console.log(val);
            }}
          />
        </div>
      </HoverPanel>
    </>
  );
};

export default DatePicker;
