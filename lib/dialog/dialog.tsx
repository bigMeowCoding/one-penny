import React, { FC, Fragment, ReactElement, ReactNode } from "react";
import "./dialog.scss";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import { Icon } from "../index";
import ReactDOM from "react-dom";
import { ModalRef } from "./dialog.types";

const addPrefixForClassName = makeClassByPrefix("zui-dialog");
interface Props {
  visible: boolean;
  footer?: ReactElement[];
  onCancel?: React.MouseEventHandler;
  onOk?: React.MouseEventHandler;
}
const Dialog: FC<Props> = ({ visible, onCancel, ...props }) => {
  if (!visible) {
    return null;
  }
  const dialog = (
    <Fragment>
      <div className={addPrefixForClassName("mask")} />
      <div className={addPrefixForClassName("")}>
        <header className={addPrefixForClassName("header")}>
          提示
          <div className={addPrefixForClassName("close")} onClick={onCancel}>
            <Icon name="close" />
          </div>
        </header>
        <main className={addPrefixForClassName("body")}>{props.children}</main>
        {props.footer && props.footer.length ? (
          <footer className={addPrefixForClassName("footer")}>
            {props.footer}
          </footer>
        ) : null}
      </div>
    </Fragment>
  );
  return ReactDOM.createPortal(dialog, document.body);
};

export const alert = (message: string) => {
  const { close } = modal(message, [
    <button
      onClick={() => {
        close();
      }}
    >
      ok
    </button>,
  ]);
};

export const confirm = (
  message: string,
  onOk?: () => void,
  onCancel?: () => void
) => {
  function cancelHandle() {
    if (onCancel) {
      onCancel();
    }
    close();
  }
  function confirmHandle() {
    if (onOk) {
      onOk();
    }
    close();
  }

  const { close } = modal(
    message,
    [
      <button onClick={confirmHandle}>确认</button>,
      <button onClick={cancelHandle}>关闭</button>,
    ],
    onCancel
  );
};

export const modal = (
  content: ReactNode,
  buttons?: ReactElement[],
  afterClose?: () => void
): ModalRef => {
  function close() {
    ReactDOM.render(
      React.cloneElement(dialogComponent, { visible: false }),
      div
    );
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  }

  const div = document.createElement("div"),
    dialogComponent = (
      <Dialog
        visible={true}
        onCancel={() => {
          if (afterClose) {
            afterClose();
          }
          close();
        }}
        onOk={close}
        footer={buttons}
      >
        {content}
      </Dialog>
    );
  ReactDOM.render(dialogComponent, div);
  document.body.append(div);
  return { close };
};
export default Dialog;
