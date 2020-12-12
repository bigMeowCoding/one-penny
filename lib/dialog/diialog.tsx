import React, { FC, Fragment, ReactElement } from "react";
import "./dialog.scss";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import { Icon } from "../index";

const addPrefixForClassName = makeClassByPrefix("zui-dialog");
interface Props {
  visible: boolean;
  buttons?: ReactElement[];
  onCancel: (e: React.MouseEvent<HTMLElement>) => void;
  onOk: (e: React.MouseEvent<HTMLElement>) => void;
}
const Dialog: FC<Props> = function ({ visible, onCancel, onOk, ...props }) {
  if (!visible) {
    return null;
  }
  const DefaultFooter = [
    <button onClick={onCancel}>cancel</button>,
    <button onClick={onCancel}>ok</button>,
  ];

  return (
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
          {props.buttons && props.buttons.length ? (
            props.buttons
          ) : (
            <Fragment>{DefaultFooter}</Fragment>
          )}
        </footer>
      </div>
    </Fragment>
  );
};

export default Dialog;
