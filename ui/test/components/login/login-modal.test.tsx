import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import LoginModal from '../../../src/components/login/login-modal';

let component: ReactWrapper;
const jestMock = jest.fn();

beforeEach(() => {
    component = mount(<LoginModal openPopup={true} setOpenPopup={jestMock} />);
});
afterEach(() => {
    component.unmount();
    jestMock.mockReset();
});

describe('On Render', () => {
    it('should render Existing User Login and not Temp Password Login', () => {
        expect(component.find('main#login-form')).toHaveLength(1);
    });
    it('should render Close Modal Icon', () => {
        expect(component.find('button#close-login-modal')).toHaveLength(1);
    });
});

describe('Switch Login Form', () => {
    it('should render Reset Temp Password Login when switch form onclick is clicked', () => {
        component.find('a#temp-password-form-link').simulate('click');

        expect(component.find('main#temp-password-login-form')).toHaveLength(1);

        component.find('a#login-form-link').simulate('click');

        expect(component.find('main#login-form')).toHaveLength(1);
    });
});

describe('Close Modal', () => {
    it('should call setOpenPopup call back with false', () => {
        component.find('button#close-login-modal').simulate('click');

        expect(jestMock).toHaveBeenCalledTimes(1);
        expect(jestMock).toHaveBeenLastCalledWith(false);
    });
});
