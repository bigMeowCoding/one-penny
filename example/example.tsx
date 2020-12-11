import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Link, Route } from "react-router-dom";
import IconExample from "../lib/icon/icon-example";
import DialogExample from "../lib/dialog/dialog-example";
function ButtonExample() {
  return <div>button example</div>;
}
ReactDOM.render(
  <HashRouter>
    <div>
      <header>header</header>
      <div>
        <aside>
          <h2>组件</h2>
          <ul>
            <li>
              <Link to="/icon">Icon</Link>
            </li>
            <li>
              <Link to="/button">button</Link>
            </li>
            <li>
              <Link to="/dialog">dialog</Link>
            </li>
          </ul>
        </aside>
        <main>
          <Route path="/icon" component={IconExample} />
          <Route path="/dialog" component={DialogExample} />
          <Route path="/button" component={ButtonExample} />
        </main>
      </div>
    </div>
  </HashRouter>,
  document.querySelector("#root")
);
