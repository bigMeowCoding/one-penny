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
        <div className={addPrefixForClassName("close")}>
          <Icon name="close" />
        </div>
        <header>提示</header>
        <main>{props.children}</main>
          <footer>
              <button>ok</button>
              <button>cancel</button>
          </footer>
      </div>
    </Fragment>
  );
};

export default Dialog;
