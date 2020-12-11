import React, { FC, Fragment } from "react";
import "./dialog.scss";
import makeClassByPrefix from "../common/utils/makeClassByPrefix";
import { Icon } from "../index";

const addPrefixForClassName = makeClassByPrefix("zui-dialog");
interface Props {
  visible: boolean;
}
const Dialog: FC<Props> = function (props) {
  return (
    <Fragment>
      <div className={addPrefixForClassName("mask")} />
      <div className={addPrefixForClassName()}>
        <header className={addPrefixForClassName('header')}>
          提示
          <div className={addPrefixForClassName("close")}>
            <Icon name="close" />
          </div>
        </header>
        <main className={addPrefixForClassName('body')}>{props.children}</main>
        <footer className={addPrefixForClassName('footer')}>
          <button>ok</button>
          <button>cancel</button>
        </footer>
      </div>
    </Fragment>
  );
};

export default Dialog;
