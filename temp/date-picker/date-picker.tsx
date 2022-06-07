import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import './date-picker.scss';
import HoverPanel from '../common/component/hover-panel/hover-panel';
import Input from '../input/input';
import dayjs from 'dayjs';
import { OnChangeType } from './typing';
import DatePickerContent from './date-picker-content';

const DatePicker: FC<{
  onChange: OnChangeType;
}> = ({ onChange }) => {
  const [value, setValue] = useState<string>('');

  useEffect(() => {
    document.addEventListener(
      'click',
      () => {
        setLayVisible(false);
      },
      false,
    );
  }, []);
  const [layVisible, setLayVisible] = useState(false);
  return (
    <HoverPanel
      layVisible={layVisible}
      overlay={
        <DatePickerContent
          date={value ? new Date(value) : new Date()}
          onChange={(date) => {
            setValue(dayjs(date).format('YYYY-MM-DD'));
            onChange(date);
            setLayVisible(false);
          }}
        />
      }
    >
      <div>
        <Input
          value={value}
          onClick={(e) => {
            e.nativeEvent.stopImmediatePropagation();
          }}
          onFocus={() => {
            setLayVisible(true);
          }}
          onChange={(val) => {
            console.log(val);
          }}
        />
      </div>
    </HoverPanel>
  );
};

export default DatePicker;
