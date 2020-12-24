import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import TempPasswordLoginForm from '../../../src/components/login/temp-password-login-form';
import { CognitoClient } from '../../../src/rest/clients/cognito-client';

jest.mock('../../../src/rest/clients/cognito-client');

let component: ReactWrapper;
const onSuccessCallBack = jest.fn();

beforeAll(() => (process.env = Object.assign(process.env, { REACT_APP_API_PLATFORM: 'AWS' })));
beforeEach(() => (component = mount(<TempPasswordLoginForm onChangeForm={() => {}} onSuccess={onSuccessCallBack} />)));
afterEach(() => component.unmount());
afterAll(() => (process.env = Object.assign(process.env, { REACT_APP_API_PLATFORM: '' })));

describe('On Render', () => {
    it('should render username input field', () => {
        const inputField = component.find('input#username');
        expect(inputField.length).toBe(1);
    });
    it('should render temporary password input field', () => {
        const inputField = component.find('input#old-password');
        expect(inputField.length).toBe(1);
    });
    it('should render new password input field', () => {
        const inputField = component.find('input#new-password');
        expect(inputField.length).toBe(1);
    });
    it('should render Update Password button', () => {
        expect(component.find('button#submit-sign-in-button')).toHaveLength(1);
    });

    it('should submit the form if all 3 textfields have text and the enter key is pressed ', () => {
        //given that i have inputted my details in the text field
        //when I press the enter key
        //the form should submit
    });
    it('should submit the form if all 3 textfields have text and the submit button is clicked ', () => {
        //given that i have inputted my details in the text field
        //when I click the submit button
        //the form should submit
    });
});

describe('Disable Form', () => {
    it('should be disabled when the Username, Temp Password and New Password fields are empty', () => {
        expect(component.find('button#submit-sign-in-button').props().disabled).toBe(true);
    });
    it('should be disabled when the Username field is empty', () => {
        inputTempPassword('testTempPassword');
        inputNewPassword('testNewPassword');

        expect(component.find('button#submit-sign-in-button').props().disabled).toBe(true);
    });
    it('should be disabled when the Temp password field is empty', () => {
        inputUsername('testUsername');
        inputNewPassword('testNewPassword');

        expect(component.find('button#submit-sign-in-button').props().disabled).toBe(true);
    });
    it('should be disabled when the New password field is empty', () => {
        inputUsername('testUsername');
        inputTempPassword('testTempPassword');

        expect(component.find('button#submit-sign-in-button').props().disabled).toBe(true);
    });
    it('should be enabled when Username, Temp Password and New Password is inputted', () => {
        inputUsername('testUsername');
        inputTempPassword('testTempPassword');
        inputNewPassword('testNewPassword');

        expect(component.find('button#submit-sign-in-button').props().disabled).toBe(false);
    });
    it('should display welcome message and call onSuccess call back when sign in is successful', () => {
        mockCognitoClientNewUserLogin();

        inputUsername('BillSmith');
        inputTempPassword('testTempPassword');
        inputNewPassword('testNewPassword');
        clickSubmitSignIn();

        expect(component.find('div#notification-alert').text()).toBe('Login successful: Hi BillSmith');
        expect(onSuccessCallBack).toHaveBeenCalledTimes(1);
    });
    it('should display error message when sign in fails', () => {
        mockCognitoClientNewUserLoginWithError('Temp password incorrect');

        inputUsername('testUsername');
        inputTempPassword('testTempPassword');
        inputNewPassword('testNewPassword');
        clickSubmitSignIn();

        expect(component.find('div#notification-alert').text()).toBe('Login failed: Temp password incorrect');
    });
});

function inputUsername(username: string): void {
    component.find('input#username').simulate('change', {
        target: { value: username },
    });
    expect(component.find('input#username').length).toBe(1);
}

function inputTempPassword(oldPassword: string): void {
    component.find('input#old-password').simulate('change', {
        target: { value: oldPassword },
    });
    expect(component.find('input#old-password').length).toBe(1);
}

function inputNewPassword(newPassword: string): void {
    component.find('input#new-password').simulate('change', {
        target: { value: newPassword },
    });
    expect(component.find('input#new-password').length).toBe(1);
}

function clickSubmitSignIn() {
    component.find('button#submit-sign-in-button').simulate('click');
}

function mockCognitoClientNewUserLogin() {
    // @ts-ignore
    CognitoClient.prototype.setNewPasswordAndLogin.mockImplementationOnce(
        (username: string, password: string, oldPassword: string, onSuccess: () => void, onError: () => void) => {
            onSuccess();
        }
    );
}

function mockCognitoClientNewUserLoginWithError(errorMessage: string) {
    // @ts-ignore
    CognitoClient.prototype.setNewPasswordAndLogin.mockImplementationOnce(
        (
            username: string,
            password: string,
            oldPassword: string,
            onSuccess: () => void,
            onError: (errorMessage: string) => void
        ) => {
            onError(errorMessage);
        }
    );
}
