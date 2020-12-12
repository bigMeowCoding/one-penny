import React, { useState } from "react";
import { FC } from "react";
import Dialog, { alert, confirm } from "./diialog";
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
        alert
      </button>
      <button
        onClick={() => {
          confirm(
            "hhhh",
            () => {
              console.log("ok");
            },
            () => {
              console.log("cancel");
            }
          );
        }}
      >
        confirm
      </button>
    </div>
  );
};

export default DialogExample;
