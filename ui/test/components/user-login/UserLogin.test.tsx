import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import UserLogin from '../../../src/components/UserLogin/UserLogin';

let wrapper: ReactWrapper;
beforeEach(() => (wrapper = mount(<UserLogin />)));
afterEach(() => wrapper.unmount());

describe('Sign In input fields', () => {
    it('should have a username input field', () => {
        const inputField = wrapper.find('input#username2');
        expect(inputField.props().name).toBe('username2');
    });
    it('should have a password input field', () => {
        const inputField = wrapper.find('input#password');
        expect(inputField.props().name).toBe('password');
    });
});

describe('Sign in Button', () => {
    it('should have a Sign In button', () => {
        expect(wrapper.find('button#sign-in-button')).toHaveLength(1);
    });
    it('should be disabled when Username and Password fields are empty', () => {
        expect(wrapper.find('button#sign-in-button').props().disabled).toBe(true);
    });
    it('should be disabled when Username field is empty', () => {
        inputPassword('testPassword');
        expect(wrapper.find('button#sign-in-button').props().disabled).toBe(true);
    });
    it('should be disabled when Password field is empty', () => {
        inputUsername2('testUsername');
        expect(wrapper.find('button#sign-in-button').props().disabled).toBe(true);
    });
    it('should be enabled when Username and Password is inputted', () => {
        inputUsername2('testUsername');
        inputPassword('testPassword');
        expect(wrapper.find('button#sign-in-button').props().disabled).toBe(false);
    });
});

function inputUsername2(username: string): void {
    wrapper.find('input#username2').simulate('change', {
        target: { value: username },
    });
    expect(wrapper.find('input#username2').props().value).toBe(username);
}
function inputPassword(password: string): void {
    wrapper.find('input#password').simulate('change', {
        target: { value: password },
    });
    expect(wrapper.find('input#password').props().value).toBe(password);
}
