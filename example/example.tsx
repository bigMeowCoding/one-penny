import React from "react";
import ReactDOM from "react-dom";
import { HashRouter, NavLink, Route } from "react-router-dom";
import IconExample from "../lib/icon/icon-example";
import DialogExample from "../lib/dialog/dialog-example";
import LayoutExample from "../lib/layout/layout-example";
import ButtonExample from "../lib/button/button-example";
import { Aside, Content, Footer, Header, Layout } from "../lib/layout";
import "./example.scss";
import logo from "./logo.png";
import IconDemo from "../lib/icon/icon-demo";
import FormExample from "../lib/form/form.example";
console.log(logo);
ReactDOM.render(
  <HashRouter>
    <Layout className="page">
      <Header className="site-header">
        <img src={logo} width="40" alt="" />
        <span>ZYJ-UI</span>
      </Header>
      <Content className="site-content">
        <Layout>
          <Aside className="site-aside">
            <h2>组件</h2>
            <ul>
              <li>
                <NavLink to="/icon">Icon</NavLink>
              </li>
              <li>
                <NavLink to="/button">button</NavLink>
              </li>
              <li>
                <NavLink to="/dialog">dialog</NavLink>
              </li>
              <li>
                <NavLink to="/layout">layout</NavLink>
              </li>
              <li>
                <NavLink to="/form">form</NavLink>
              </li>
            </ul>
          </Aside>
          <Content className="case-content">
            <Route path="/icon" component={IconDemo} />
            <Route path="/dialog" component={DialogExample} />
            <Route path="/button" component={ButtonExample} />
            <Route path="/layout" component={LayoutExample} />
            <Route path="/form" component={FormExample} />
          </Content>
        </Layout>
      </Content>
      <Footer className="site-footer">@copy 周义竣</Footer>
    </Layout>
  </HashRouter>,
  document.querySelector("#root")
);
