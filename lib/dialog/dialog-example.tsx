import React, { useState } from "react";
import { FC } from "react";
import Dialog, { alert } from "./diialog";
import "./example.scss";
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
  // React.CSSProperties;
  return (
    <div>
      <button
        className="button-test"
        onClick={() => setVisible((visible) => !visible)}
      >
        toggle
      </button>
      <Dialog visible={visible} onOk={onOk} onCancel={onCancel} />
      <button
        onClick={() => {
          alert("hhhh");
        }}
      >
        example2
      </button>
    </div>
  );
};

export default DialogExample;
