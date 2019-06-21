import React from 'react';
import { shallow } from 'enzyme';
import Login from '../Login'

describe('Login', () => {

    it('renders without crashing', () => {
        shallow(<Login />);
    });

    it('Has h1 tag with text', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('h1').text()).toEqual('Find my repo !');
    });

    it('Has 2 input fields', () => {
        const wrapper = shallow(<Login />);
        expect(wrapper.find('input').length).toEqual(2);
    });
});
