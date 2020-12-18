import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, Link, Route } from "react-router-dom";
import IconExample from "../lib/icon/icon-example";
import DialogExample from "../lib/dialog/dialog-example";
import LayoutExample from "../lib/layout/layout-example";
import ButtonExample from "../lib/button/button-example";
import { Aside, Content, Footer, Header, Layout } from "../lib/layout";
import "./example.scss";
import logo from "./logo.png";
console.log(logo);
ReactDOM.render(
  <HashRouter>
    <Layout className="page">
      <Header className="site-header">
        <img src={logo} width="40" alt="" />
        <span>ZYJ-UI</span>
      </Header>
      <Content className='site-content'>
        <Layout>
          <Aside className="site-aside">
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
              <li>
                <Link to="/layout">layout</Link>
              </li>
            </ul>
          </Aside>
          <Content className='case-content'>
            <Route path="/icon" component={IconExample} />
            <Route path="/dialog" component={DialogExample} />
            <Route path="/button" component={ButtonExample} />
            <Route path="/layout" component={LayoutExample} />
          </Content>
        </Layout>
      </Content>
      <Footer className="site-footer">@copy 周义竣</Footer>
    </Layout>
  </HashRouter>,
  document.querySelector("#root")
);
