import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import LoginForm from '../../../src/components/login/login-form';

let component: ReactWrapper;

beforeEach(() => (component = mount(<LoginForm onChangeForm={() => {}} />)));
afterEach(() => component.unmount());

describe('On Render', () => {
    it('should have a username input field', () => {
        const inputField = component.find('input#username');

        expect(inputField).toHaveLength(1);
    });
    it('should have a password input field', () => {
        const inputField = component.find('input#password');

        expect(inputField).toHaveLength(1);
    });
    it('should have a Sign In button', () => {
        expect(component.find('button#sign-in-button')).toHaveLength(1);
    });
});

describe('Sign in Button', () => {
    it('should be disabled when Username and Password fields are empty', () => {
        expect(component.find('button#sign-in-button').props().disabled).toBe(true);
    });
    it('should be disabled when Username field is empty', () => {
        inputPassword('testPassword');

        expect(component.find('button#sign-in-button').props().disabled).toBe(true);
    });
    it('should be disabled when Password field is empty', () => {
        inputUsername('testUsername');

        expect(component.find('button#sign-in-button').props().disabled).toBe(true);
    });
    it('should be enabled when Username and Password is inputted', () => {
        inputUsername('testUsername');
        inputPassword('testPassword');

        expect(component.find('button#sign-in-button').props().disabled).toBe(false);
    });
});

function inputUsername(username: string): void {
    component.find('input#username').simulate('change', {
        target: { value: username },
    });
    expect(component.find('input#username').length).toBe(1);
}
function inputPassword(password: string): void {
    component.find('input#password').simulate('change', {
        target: { value: password },
    });
    expect(component.find('input#password').length).toBe(1);
}
