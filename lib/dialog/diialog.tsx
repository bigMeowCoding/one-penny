import React, { FC, Fragment, ReactElement } from "react";
import "./dialog.scss";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import { Icon } from "../index";
import ReactDOM from "react-dom";

const addPrefixForClassName = makeClassByPrefix("zui-dialog");
interface Props {
  visible: boolean;
  footer?: ReactElement[];
  onCancel: React.MouseEventHandler;
  onOk: React.MouseEventHandler;
}
const Dialog: FC<Props> = function ({ visible, onCancel, onOk, ...props }) {
  if (!visible) {
    return null;
  }
  const diaglog = (
    <Fragment>
      <div className={addPrefixForClassName("mask")} />
      <div className={addPrefixForClassName()}>
        <header className={addPrefixForClassName("header")}>
          提示
          <div className={addPrefixForClassName("close")} onClick={onCancel}>
            <Icon name="close" />
          </div>
        </header>
        <main className={addPrefixForClassName("body")}>{props.children}</main>
        <footer className={addPrefixForClassName("footer")}>
          {props.footer && props.footer.length ? props.footer : null}
        </footer>
      </div>
    </Fragment>
  );
  return ReactDOM.createPortal(diaglog, document.body);
};

export const alert = function (message: string) {
  function closeDialog() {
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
        onCancel={closeDialog}
        onOk={closeDialog}
        footer={[<button onClick={closeDialog}>ok</button>]}
      >
        {message}
      </Dialog>
    );
  ReactDOM.render(dialogComponent, div);
  document.body.append(div);
};
export const confirm = function (
  message: string,
  onOk?: () => void,
  onCancel?: () => void
) {
  function close() {
    ReactDOM.render(
      React.cloneElement(dialogComponent, { visible: false }),
      div
    );
    ReactDOM.unmountComponentAtNode(div);
    div.remove();
  }

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
  const div = document.createElement("div"),
    dialogComponent = (
      <Dialog
        visible={true}
        onCancel={cancelHandle}
        onOk={confirmHandle}
        footer={[
          <button onClick={confirmHandle}>确认</button>,
          <button onClick={cancelHandle}>关闭</button>,
        ]}
      >
        {message}
      </Dialog>
    );
  ReactDOM.render(dialogComponent, div);
  document.body.append(div);
};
export default Dialog;
