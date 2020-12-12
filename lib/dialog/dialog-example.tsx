import React, { useState } from "react";
import { FC } from "react";
import Dialog from "./diialog";

const DialogExample: FC = function () {
  const [visible, setVisible] = useState(false);
  function onOk() {
    setVisible(false);
  }
  function onCancel() {
    setVisible(false);
  }
  return (
    <div>
      <button onClick={() => setVisible((visible) => !visible)}>toggle</button>
      <Dialog visible={visible} onOk={onOk} onCancel={onCancel} />
    </div>
  );
};

export default DialogExample;
