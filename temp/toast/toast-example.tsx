import React from 'react';
import { FC } from 'react';
import { Button } from '../index';
import Toast from './index';

const ToastExample: FC = () => {
  return (
    <Button
      onClick={() => {
        Toast.show({
          content: 'msg',
          duration: 0,
        });
      }}
    >
      toast
    </Button>
  );
};
export default ToastExample;
