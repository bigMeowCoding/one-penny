import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, NavLink, Route } from 'react-router-dom';
import DialogExample from '../lib/dialog/dialog-example';
import LayoutExample from '../lib/layout/layout-example';
import ButtonExample from '../lib/button/button-example';
import { Aside, Content, Footer, Header, Layout } from '../lib';
import './example.scss';
import logo from './logo.png';
import IconDemo from '../lib/icon/icon-demo';
import FormExample from '../lib/form/form.example';
import InputExample from '../lib/input/input-example';
import ScrollExample from '../lib/scroll/scroll-example';
import TreeExample from '../lib/tree/tree-example';
import CitySelectorExample from '../lib/city-selector/city-selector-example';
import DropDownExample from '../lib/drop-down/drop-down-example';
import DatePickerExample from '../lib/date-picker/date-picker-example';
import ToastExample from '../lib/toast/toast-example';
import MaskExample from '../lib/mask/mask-example';

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
