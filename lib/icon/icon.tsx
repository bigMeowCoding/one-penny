import React, { FC } from "react";
import "./importAllIcons";
import "./icon.scss";
interface Props {
  name: string;
}

const Icon: FC<Props> = function ({ name }) {
  return (
    <span className='icon'>
      <svg>
        <use xlinkHref={`#${name}`} />
      </svg>
    </span>
  );
};
export default Icon;
