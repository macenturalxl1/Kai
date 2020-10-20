import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import TempPasswordLoginForm from '../../../src/components/login/temp-password-login-form';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ReactTestUtils from 'react-dom/test-utils';

var ReactTestUtils = require('react-dom/test-utils');
let component: ReactWrapper;

beforeEach(() => (component = mount(<TempPasswordLoginForm onChangeForm={() => {}} />)));
afterEach(() => component.unmount());

describe('On Render', () => {
    it('should render username input field', () => {
        const inputField = component.find('input#username');
        expect(inputField.length).toBe(1);
    });
    it('should render temporary password input field', () => {
        const inputField = component.find('input#temp-password');
        expect(inputField.length).toBe(1);
    });
    it('should render new password input field', () => {
        const inputField = component.find('input#new-password');
        expect(inputField.length).toBe(1);
    });
    it('should render Update Password button', () => {
        expect(component.find('button#update-button')).toHaveLength(1);
    });
    it('should submit the form when all three fields have text and the Enter key is pressed', () => {
        //given I have entered details in the 3 textfields
        //when I press the enter key
        //then it should submit the form
        inputUsername('testUsername');
        inputTempPassword('testTempPassword');
        inputNewPassword('testNewPassword');

        const textField = component.find('input#username');
        ReactTestUtils.Simulate.keyDown(textField, {key: "Enter", keyCode: 13, which: 13});
        // component.find('input#username').simulate('keyDown', { key: 'Enter', keyCode: 13, which: 13 });
        // expect(component.find('input#username').props().onKeyPress).toBeTruthy();
        expect(component.find('div#notification-alert').text()).toBe('Login failed: User does not exist.');
    });
});

describe('Disable Form', () => {
    it('should be disabled when the Username, Temp Password and New Password fields are empty', () => {
        expect(component.find('button#update-button').props().disabled).toBe(true);
    });
    it('should be disabled when the Username field is empty', () => {
        inputTempPassword('testTempPassword');
        inputNewPassword('testNewPassword');

        expect(component.find('button#update-button').props().disabled).toBe(true);
    });
    it('should be disabled when the Temp password field is empty', () => {
        inputUsername('testUsername');
        inputNewPassword('testNewPassword');

        expect(component.find('button#update-button').props().disabled).toBe(true);
    });
    it('should be disabled when the New password field is empty', () => {
        inputUsername('testUsername');
        inputTempPassword('testTempPassword');

        expect(component.find('button#update-button').props().disabled).toBe(true);
    });
    it('should be enabled when Username, Temp Password and New Password is inputted', () => {
        inputUsername('testUsername');
        inputTempPassword('testTempPassword');
        inputNewPassword('testNewPassword');

        expect(component.find('button#update-button').props().disabled).toBe(false);
    });
});

function inputUsername(username: string): void {
    component.find('input#username').simulate('change', {
        target: { value: username },
    });
    expect(component.find('input#username').length).toBe(1);
}
function inputTempPassword(tempPassword: string): void {
    component.find('input#temp-password').simulate('change', {
        target: { value: tempPassword },
    });
    expect(component.find('input#temp-password').length).toBe(1);
}
function inputNewPassword(newPassword: string): void {
    component.find('input#new-password').simulate('change', {
        target: { value: newPassword },
    });
    expect(component.find('input#new-password').length).toBe(1);
}
