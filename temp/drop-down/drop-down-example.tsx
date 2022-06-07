import React from 'react';
import { FC } from 'react';
import DropDown from './drop-down';

const DropDownExample: FC = () => {
  return (
    <article>
      <section>
        <h4>example 1</h4>
        <div>
          <DropDown
            overlay={() => {
              return <div>content</div>;
            }}
          >
            example1
          </DropDown>
        </div>
      </section>
    </article>
  );
};

export default DropDownExample;
