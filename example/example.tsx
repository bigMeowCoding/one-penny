import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import DialogExample from '../src/dialog/dialog-example';
import LayoutExample from '../src/layout/layout-example';
import ButtonExample from '../src/button/button-example';
import { Aside, Content, Footer, Header, Layout } from '../src';
import './example.scss';
import logo from './logo.png';
import IconDemo from '../src/icon/icon-demo';
import FormExample from '../src/form/form.example';
import InputExample from '../src/input/input-example';
import ScrollExample from '../src/scroll/scroll-example';
import TreeExample from '../src/tree/tree-example';
import CitySelectorExample from '../src/city-selector/city-selector-example';
import DropDownExample from '../src/drop-down/drop-down-example';
import DatePickerExample from '../src/date-picker/date-picker-example';
import ToastExample from '../src/toast/toast-example';
import MaskExample from '../src/mask/mask-example';

ReactDOM.render(
  <HashRouter>
    <Layout className='page'>
      <Header className='site-header'>
        <img src={logo} width='80' height='40' alt='icon' />
        <span>ZYJ-UI</span>
      </Header>
      <Content className='site-content'>
        <Layout>
          <Aside className='site-aside'>
            <h2>组件</h2>
            <ul>
              <li>
                <NavLink to='/icon'>Icon</NavLink>
              </li>
              <li>
                <NavLink to='/button'>button</NavLink>
              </li>
              <li>
                <NavLink to='/dialog'>dialog</NavLink>
              </li>
              <li>
                <NavLink to='/layout'>layout</NavLink>
              </li>
              <li>
                <NavLink to='/form'>form</NavLink>
              </li>
              <li>
                <NavLink to='/input'>input</NavLink>
              </li>
              <li>
                <NavLink to='/scroll'>scroll</NavLink>
              </li>
              <li>
                <NavLink to='/tree'>tree</NavLink>
              </li>
              <li>
                <NavLink to='/city-selector'>city-selector</NavLink>
              </li>
              <li>
                <NavLink to='/drop-down'>drop-down</NavLink>
              </li>
              <li>
                <NavLink to='/date-picker'>date-picker</NavLink>
              </li>
              <li>
                <NavLink to='/toast'>toast</NavLink>
              </li>
              <li>
                <NavLink to='/mask'>mask</NavLink>
              </li>
            </ul>
          </Aside>
          <Content className='case-content'>
            <Route path='/icon' component={IconDemo} />
            <Route path='/dialog' component={DialogExample} />
            <Route path='/button' component={ButtonExample} />
            <Route path='/layout' component={LayoutExample} />
            <Route path='/form' component={FormExample} />
            <Route path='/input' component={InputExample} />
            <Route path='/scroll' component={ScrollExample} />
            <Route path='/tree' component={TreeExample} />
            <Route path='/city-selector' component={CitySelectorExample} />
            <Route path='/drop-down' component={DropDownExample} />
            <Route path='/date-picker' component={DatePickerExample} />
            <Route path='/toast' component={ToastExample} />
            <Route path='/mask' component={MaskExample} />
          </Content>
        </Layout>
      </Content>
      <Footer className='site-footer'>@copy 周义竣</Footer>
    </Layout>
  </HashRouter>,
  document.querySelector('#root')
);
