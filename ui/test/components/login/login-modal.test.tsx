import { Dialog } from '@material-ui/core';
import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import LoginModal from '../../../src/components/login/login-modal';
import { CognitoClient } from '../../../src/rest/clients/cognito-client';

jest.mock('../../../src/rest/clients/cognito-client');

let component: ReactWrapper;
const jestMock = jest.fn();

beforeEach(() => {
    component = mount(<LoginModal />);
});
afterEach(() => {
    component.unmount();
    jestMock.mockReset();
});

describe('On Render', () => {
    it('should render Sign In Button and not Sign Out', () => {
        const signInButton = component.find('button#sign-in-button');

        expect(signInButton.length).toBe(1);
        expect(signInButton.text()).toBe('Sign in');

        expect(component.find('button#sign-out-button').length).toBe(0);
    });
    it('should not render Login form', () => {
        expect(component.find('main#login-form').length).toBe(0);
    });
});

describe('Switch Login Form', () => {
    it('should render Reset Temp Password Login when switch form onclick is clicked', () => {
        clickSignInButton();
        clickNewUserSignIn();

        expect(component.find('main#temp-password-login-form')).toHaveLength(1);
        expect(component.find('main#login-form')).toHaveLength(0);

        component.find('a#login-form-link').simulate('click');

        expect(component.find('main#temp-password-login-form')).toHaveLength(0);
        expect(component.find('main#login-form')).toHaveLength(1);
    });
});

describe('Close Modal Button', () => {
    it('should close the Dialog Modal by setting open prop to false', () => {
        clickSignInButton();
        expect(component.find('main#login-form').length).toBe(1);
        expect(component.find(Dialog).at(0).props().open).toBe(true);

        clickCloseModalButton();

        expect(component.find(Dialog).at(0).props().open).toBe(false);
    });
});

describe('Sign Out Button Render', () => {
    it('should show Sign Out when Existing User has successfully logged in', async () => {
        mockCognitoClientLogin();

        clickSignInButton();
        inputUsername('testUsername');
        inputPassword('testPassword');

        clickSubmitSignIn();
        clickCloseModalButton();

        const signOutButton = component.find('button#sign-out-button');
        expect(signOutButton.length).toBe(1);
        expect(signOutButton.text()).toBe('Sign out');

        expect(component.html()).not.toContain('id="sign-in-button"');
    });
    it('should show Sign Out when New User with Temp Password has successfully logged in', async () => {
        mockCognitoClientNewUserLogin();

        clickSignInButton();
        clickNewUserSignIn();
        inputUsername('testUsername');
        inputTempPassword('testTempPassword');
        inputNewPassword('testNewPassword');

        clickSubmitSignIn();
        clickCloseModalButton();

        const signOutButton = component.find('button#sign-out-button');
        expect(signOutButton.length).toBe(1);
        expect(signOutButton.text()).toBe('Sign out');

        expect(component.html()).not.toContain('id="sign-in-button"');
    });
});

describe('Sign Out Outcomes', () => {
    it('should show modal with success message for successful logout', () => {
        mockCognitoClientLogin();
        mockCognitoClientSuccessfulLogOut();

        clickSignInButton();
        inputUsername('testUsername');
        inputPassword('testPassword');
        clickSubmitSignIn();
        clickCloseModalButton();

        clickSignOutButton();

        expect(component.find(Dialog).at(1).text()).toBe('You have successfully sign out');
    });
    it('should show modal with error message when sign out fails', () => {
        mockCognitoClientLogin();
        mockCognitoClientFailedLogOut('Sign out was a failure');

        clickSignInButton();
        inputUsername('testUsername');
        inputPassword('testPassword');
        clickSubmitSignIn();
        clickCloseModalButton();

        clickSignOutButton();

        expect(component.find(Dialog).at(1).text()).toBe('Sign out was a failure');
    });
    it('should close modal by clicking the close button', () => {
        mockCognitoClientLogin();
        mockCognitoClientSuccessfulLogOut();

        clickSignInButton();
        inputUsername('testUsername');
        inputPassword('testPassword');
        clickSubmitSignIn();
        clickCloseModalButton();
        clickSignOutButton();

        expect(component.find(Dialog).at(1).props().open).toBe(true);

        component.find(Dialog).find('button#close-signout-outcome-modal').simulate('click');

        expect(component.find(Dialog).at(1).props().open).toBe(false);
    });
});

function clickSubmitSignIn() {
    component.find('button#submit-sign-in-button').simulate('click');
}

function clickSignInButton() {
    component.find('button#sign-in-button').simulate('click');
}

function clickSignOutButton() {
    component.find('button#sign-out-button').simulate('click');
}

function clickCloseModalButton() {
    component.find('button#close-login-modal').simulate('click');
}

function clickNewUserSignIn() {
    component.find('a#temp-password-form-link').simulate('click');
}

function inputTempPassword(tempPassword: string): void {
    expect(component.find('input#temp-password').length).toBe(1);
    component.find('input#temp-password').simulate('change', {
        target: { value: tempPassword },
    });
}

function inputNewPassword(newPassword: string): void {
    expect(component.find('input#new-password').length).toBe(1);
    component.find('input#new-password').simulate('change', {
        target: { value: newPassword },
    });
}

function inputUsername(username: string): void {
    expect(component.find('input#username').length).toBe(1);
    component.find('input#username').simulate('change', {
        target: { value: username },
    });
}

function inputPassword(password: string): void {
    expect(component.find('input#password').length).toBe(1);
    component.find('input#password').simulate('change', {
        target: { value: password },
    });
}

function mockCognitoClientLogin() {
    // @ts-ignore
    CognitoClient.prototype.login.mockImplementationOnce(
        (username: string, password: string, onSuccess: () => void, onError: () => void) => {
            onSuccess();
        }
    );
}

function mockCognitoClientNewUserLogin() {
    // @ts-ignore
    CognitoClient.prototype.setNewPasswordAndLogin.mockImplementationOnce(
        (username: string, password: string, tempPassword: string, onSuccess: () => void, onError: () => void) => {
            onSuccess();
        }
    );
}

function mockCognitoClientSuccessfulLogOut() {
    // @ts-ignore
    CognitoClient.prototype.signOut.mockImplementationOnce((onSuccess: () => void, onError: () => void) => {
        onSuccess();
    });
}

function mockCognitoClientFailedLogOut(errorMessage: string) {
    // @ts-ignore
    CognitoClient.prototype.signOut.mockImplementationOnce(
        (onSuccess: () => void, onError: (errorMessage: string) => void) => {
            onError(errorMessage);
        }
    );
}
