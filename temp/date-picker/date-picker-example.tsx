import React from 'react';
import { FC } from 'react';
import DatePicker from './date-picker';

const DatePickerExample: FC = () => {
  return (
    <article>
      <section>
        <h4>example 1</h4>
        <div>
          <DatePicker
            onChange={(d) => {
              console.log(d);
            }}
          />
        </div>
      </section>
    </article>
  );
};

export default DatePickerExample;
