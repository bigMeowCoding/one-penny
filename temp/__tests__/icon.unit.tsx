import React from 'react';
import * as renderer from 'react-test-renderer';
import Icon from '../icon/icon';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({ adapter: new Adapter() });
import 'jsdom-global/register'; //at the top of file , even  , before importing react

describe('icon组件', () => {
  it('render correctly', () => {
    const json = renderer.create(<Icon name="wechat" />).toJSON();
    expect(json).toMatchSnapshot();
  });
  it('on click', () => {
    const fn = jest.fn();
    const iconComponent = mount(<Icon name={'wechat'} onClick={fn} />);
    iconComponent.find('svg').simulate('click');
    expect(fn).toBeCalled();
  });
});
