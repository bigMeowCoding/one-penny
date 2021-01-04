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

const Content: FC<{
  date: Date;
}> = ({ date }) => {
  const year = date.getFullYear(),
    dayjsDate = dayjs(date),
    month = date.getMonth() + 1,
    days: Date[] = [];
  console.log(dayjsDate, dayjsDate.toJSON(), dayjsDate.constructor);
  // 计算出本月第一天和最后一天
  // 将本月的日期全部放入数组
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
