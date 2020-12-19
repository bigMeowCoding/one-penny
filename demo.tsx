import React, { FC } from "react";

interface Props {
  code: string;
}

const Demo: FC<Props> = function ({ children, code }) {
  return (
    <div>
      {children}
      <pre>{code}</pre>
    </div>
  );
};
export default Demo;
