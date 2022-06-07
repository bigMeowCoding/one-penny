import React, { FC } from 'react';
import Demo from '../../demo';
import IconExample from './icon-example';
import example from '!!raw-loader!./icon-example';
interface Props {}

const IconDemo: FC<Props> = function () {
  return (
    <Demo code={example}>
      <IconExample />
    </Demo>
  );
};
export default IconDemo;
