import React, { useState } from 'react';
import { FC } from 'react';
import Mask from './index';
import { Button } from '../index';

const MaskExample: FC = () => {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <Button
        onClick={() => {
          setVisible(v => !v);
        }}
      >
        按钮
      </Button>
      <Mask
        visible={visible}
        onMaskClick={() => {
          setVisible(false);
        }}
      >
        mask
      </Mask>
    </div>
  );
};
export default MaskExample;
