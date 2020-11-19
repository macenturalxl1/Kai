import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import LoginForm from '../../../src/components/login/login-form';
import { CognitoClient } from '../../../src/rest/clients/cognito-client';

jest.mock('../../../src/rest/clients/cognito-client');

let component: ReactWrapper;
const onSuccessCallBack = jest.fn();

beforeEach(() => (component = mount(<LoginForm onChangeForm={() => {}} onSuccess={onSuccessCallBack} />)));
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
        expect(component.find('button#submit-sign-in-button')).toHaveLength(1);
    });
});

describe('Sign in Button', () => {
    it('should be disabled when Username and Password fields are empty', () => {
        expect(component.find('button#submit-sign-in-button').props().disabled).toBe(true);
    });
    it('should be disabled when Username field is empty', () => {
        inputPassword('testPassword');

        expect(component.find('button#submit-sign-in-button').props().disabled).toBe(true);
    });
    it('should be disabled when Password field is empty', () => {
        inputUsername('testUsername');

        expect(component.find('button#submit-sign-in-button').props().disabled).toBe(true);
    });
    it('should be enabled when Username and Password is inputted', () => {
        inputUsername('testUsername');
        inputPassword('testPassword');

        expect(component.find('button#submit-sign-in-button').props().disabled).toBe(false);
    });
    it('should display welcome message and call onSuccess callback when successfully logged in', () => {
        mockCognitoClientLogin();

        inputUsername('JoVibin');
        inputPassword('testPassword');
        clickSubmitSignIn();

        expect(component.find('div#notification-alert').text()).toBe('Login successful: Hi JoVibin');
        expect(onSuccessCallBack).toHaveBeenCalledTimes(1);
    });
    it('should display error message when sign in fails', () => {
        mockCognitoClientNewUserLoginWithError('My login failed');

        inputUsername('testUsername');
        inputPassword('testTempPassword');
        clickSubmitSignIn();

        expect(component.find('div#notification-alert').text()).toBe('Login failed: My login failed');
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

function clickSubmitSignIn() {
    component.find('button#submit-sign-in-button').simulate('click');
}

function mockCognitoClientLogin() {
    // @ts-ignore
    CognitoClient.prototype.login.mockImplementationOnce(
        (username: string, password: string, onSuccess: () => void, onError: () => void) => {
            onSuccess();
        }
    );
}

function mockCognitoClientNewUserLoginWithError(errorMessage: string) {
    // @ts-ignore
    CognitoClient.prototype.login.mockImplementationOnce(
        (username: string, password: string, onSuccess: () => void, onError: (errorMessage: string) => void) => {
            onError(errorMessage);
        }
    );
}
