import React, { useState } from 'react';
import { FC } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import Icon from '../icon/icon';
import makeClassByPrefix, { makeComponentPrefixClass } from '../common/utils/makeClassByPrefix';
import { OnChangeType } from './typing';
import { computeAllDays, computeMonthStartEndDate, convertDaysDate } from './utils';
import classNames from '../common/utils/classNames';
const weeks = ['一', '二', '三', '四', '五', '六', '日'];

const addClassByPrefix = makeClassByPrefix(makeComponentPrefixClass('date-picker'));

const DatePickerContent: FC<{
  date: Date;
  onChange: OnChangeType;
}> = ({ date, onChange }) => {
  const [dayjsDate, setDayjsDate] = useState<Dayjs>(dayjs(date)),
    [selectedDate, setSelectedDate] = useState<Date>(date);
  console.log('selectedDate', selectedDate.getTime());
  const year = dayjsDate.get('year'),
    month = dayjsDate.get('month') + 1;
  // 计算出本月第一天和最后一天
  const { monthFirstDate, monthLastDate } = computeMonthStartEndDate(dayjsDate);
  // 将本月的日期全部放入数组
  const daysList = computeAllDays(monthFirstDate, monthLastDate);
  // 根据本月日期始末补充开头和结尾日期
  const days = convertDaysDate(daysList);

  function isSelected(day: dayjs.Dayjs) {
    return day.valueOf() - selectedDate.getTime() === 0;
  }

  return (
    <div className={addClassByPrefix('days')}>
      <div className={addClassByPrefix('days-header')}>
        <div>
          <Icon
            name="double-arrow-left"
            onClick={() => {
              const currentMonth = dayjsDate.get('month');
              setDayjsDate(dayjsDate.subtract(1, 'year').set('month', currentMonth).set('date', 1));
            }}
          />
          <Icon
            name="arrow-left"
            onClick={() => {
              setDayjsDate(dayjsDate.subtract(1, 'month').set('date', 1));
            }}
          />
        </div>
        <div className={addClassByPrefix('days-header-current-date')}>
          <span>{year}年</span>
          <span className={addClassByPrefix('days-header-current-date-month')}>{month}月</span>
        </div>
        <div>
          <Icon
            name="arrow-right"
            onClick={() => {
              setDayjsDate(dayjsDate.add(1, 'month').set('date', 1));
            }}
          />
          <Icon
            name="double-arrow-right"
            onClick={() => {
              const currentMonth = dayjsDate.get('month');
              setDayjsDate(dayjsDate.add(1, 'year').set('month', currentMonth).set('date', 1));
            }}
          />
        </div>
      </div>
      <div className={addClassByPrefix('days-content')}>
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
                        onClick={(e) => {
                          const dayToDate = day.toDate();
                          onChange(dayToDate);
                          setSelectedDate(dayToDate);
                          e.nativeEvent.stopImmediatePropagation();
                        }}
                        className={classNames(
                          !isSelected(day) && day.get('month') !== dayjsDate.get('month')
                            ? 'other-month'
                            : '',
                          selectedDate && isSelected(day) ? 'active' : '',
                        )}
                      >
                        {day.get('date')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={addClassByPrefix('days-footer')}>
        <a href="#">今天</a>
      </div>
    </div>
  );
};

export default DatePickerContent;
