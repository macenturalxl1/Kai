import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import UpdatePassword from '../../../src/components/UserLogin/UpdatePassword';

let wrapper: ReactWrapper;
beforeEach(() => (wrapper = mount(<UpdatePassword />)));
afterEach(() => wrapper.unmount());

describe('Updating User Password input fields', () => {
    it('should have a username input field', () => {
        const inputField = wrapper.find('input#username');
        expect(inputField.props().name).toBe('username');
    });
    it('should have a temporary password input field', () => {
        const inputField = wrapper.find('input#temp-password');
        expect(inputField.props().name).toBe('temp-password');
    });
    it('should have a new password input field', () => {
        const inputField = wrapper.find('input#new-password');
        expect(inputField.props().name).toBe('new-password');
    });
});

describe('Update Password Button', () => {
    it('should have an Update Password button', () => {
        expect(wrapper.find('button#update-button')).toHaveLength(1);
    });
    it('should be disabled when the Username, Temp Password and New Password fields are empty', () => {
        expect(wrapper.find('button#update-button').props().disabled).toBe(true);
    });
    it('should be disabled when the Username field is empty', () => {
        inputTempPassword('testTempPassword');
        inputNewPassword('testNewPassword');
        expect(wrapper.find('button#update-button').props().disabled).toBe(true);
    });
    it('should be disabled when the Temp password field is empty', () => {
        inputUsername('testUsername');
        inputNewPassword('testNewPassword');
        expect(wrapper.find('button#update-button').props().disabled).toBe(true);
    });
    it('should be disabled when the New password field is empty', () => {
        inputUsername('testUsername');
        inputTempPassword('testTempPassword');
        expect(wrapper.find('button#update-button').props().disabled).toBe(true);
    });
    it('should be enabled when Username, Temp Password and New Password is inputted', () => {
        inputUsername('testUsername');
        inputTempPassword('testTempPassword');
        inputNewPassword('testNewPassword');
        expect(wrapper.find('button#update-button').props().disabled).toBe(false);
    });
});

function inputUsername(username: string): void {
    wrapper.find('input#username').simulate('change', {
        target: { value: username },
    });
    expect(wrapper.find('input#username').props().value).toBe(username);
}
function inputTempPassword(tempPassword: string): void {
    wrapper.find('input#temp-password').simulate('change', {
        target: { value: tempPassword },
    });
    expect(wrapper.find('input#temp-password').props().value).toBe(tempPassword);
}
function inputNewPassword(newPassword: string): void {
    wrapper.find('input#new-password').simulate('change', {
        target: { value: newPassword },
    });
    expect(wrapper.find('input#new-password').props().value).toBe(newPassword);
}

