import React, { useState } from "react";
import { FC } from "react";
import Dialog, { alert, confirm, modal } from "./dialog";
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
  return (
    <div>
      <button
        className="button-test"
        onClick={() => setVisible((visible) => !visible)}
      >
        toggle
      </button>
      <Dialog visible={visible} onOk={onOk} onCancel={onCancel}>
        example case
      </Dialog>
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

      <button
        onClick={() => {
          const { close } = modal(
            <div>
              <button
                onClick={() => {
                  close();
                }}
              >
                确认
              </button>
              <button
                onClick={() => {
                  close();
                }}
              >
                关闭
              </button>
            </div>
          );
        }}
      >
        modal
      </button>
    </div>
  );
};

export default DialogExample;
