import React, { FC } from "react";
import "./importAllIcons";

interface Props {
  name: string;
}

const Icon: FC<Props> = function ({ name }) {
  return (
    <span>
      <svg>
        <use xlinkHref={`#${name}`} />
      </svg>
    </span>
  );
};
export default Icon;
