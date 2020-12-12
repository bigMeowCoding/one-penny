import React, { useState } from "react";
import { FC } from "react";
import Dialog from "./diialog";

const DialogExample: FC = function () {
  const [visible, setVisible] = useState(false);
  const onOk: React.MouseEventHandler = (e) => {
    console.log(e);
    setVisible(false);
  };
  const onCancel: React.MouseEventHandler = (e) => {
    console.log(e);

    setVisible(false);
  };
  return (
    <div>
      <button onClick={() => setVisible((visible) => !visible)}>toggle</button>
      <Dialog visible={visible} onOk={onOk} onCancel={onCancel} />
    </div>
  );
};

export default DialogExample;
