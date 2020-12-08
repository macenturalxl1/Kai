import { mount, ReactWrapper } from 'enzyme';
import NavigationAppbar from '../../../src/components/Navigation/NavigationAppbar';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';

let component: ReactWrapper;

beforeEach(() => {
    component = mount(
        <MemoryRouter>
            <NavigationAppbar />
        </MemoryRouter>
    );
});
afterEach(() => component.unmount());

describe('Navigation Appbar Component', () => {
    it('should display appbar', () => {
        const appbar = component.find('h6');

        expect(appbar).toHaveLength(1);
        expect(appbar.text()).toEqual('Kai: Graph As A Service');
    });

    it('should display a Sign in button in the appbar', () => {
        const signInButton = component.find('button#sign-out-button');

        expect(signInButton.text()).toEqual('Sign out');
    });

    it('should show user id and email in Navbar', () => {
        const NavUl = component.find('ul').at(0);
        const UserIcon = NavUl.find('svg');

        expect(NavUl.find('span').text()).toEqual('User');
        expect(NavUl.find('p').text()).toEqual('someuser@mail.com');
        expect(UserIcon).toHaveLength(1);
    });

    it('should display menu in Navbar', () => {
        const cols = [{ name: 'Add Graph' }, { name: 'View Graphs' }, { name: 'User Guide' }];
        const NavLi = component.find('li').at(1);

        NavLi.forEach((li, idx) => {
            const NavIcon = li.find('svg');
            expect(li.text()).toEqual(cols[idx].name);
            expect(NavIcon).toHaveLength(1);
        });
    });

    it('should have navigation link in each list item', () => {
        const Target = [{ href: '/AddGraph' }, { href: '/ViewGraph' }, { href: '/UserGuide' }];
        const NavUl = component.find('ul').at(1);

        NavUl.forEach((NavUl, idx) => {
            const anchor = NavUl.find('a').at(idx);
            const getAttribute = anchor.getDOMNode().getAttribute('href');
            expect(getAttribute).toBe(Target[idx].href);
        });
    });
});
