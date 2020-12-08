import React, { FC } from "react";
import "./importAllIcons";
import "./icon.scss";
interface Props {
  name: string;
}

const Icon: FC<Props> = function ({ name }) {
  return (
      <svg className='zyj-ui-icon'>
        <use xlinkHref={`#${name}`} />
      </svg>
  );
};
export default Icon;
