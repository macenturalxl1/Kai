import { mount, ReactWrapper } from 'enzyme';
import React from 'react';
import SimpleAddGraph from "../../../src/components/add-graph/SimpleAddGraph";

let wrapper: ReactWrapper;
beforeEach(() => (wrapper = mount(<SimpleAddGraph />)));
afterEach(() => wrapper.unmount());

describe('SimpleAddGraph UI component', ()=> {
    describe('Layout',()=> {
        it('Should have a Graph Id text field', () =>{
            const textfield = wrapper.find('input');
            expect(textfield.at(0).props().name).toBe('graph-id');
        })
        it('Should have a graph description text field', ()=>{
            const textfield = wrapper.find('textarea#graph-description');
            expect(textfield.props().name).toBe('graph-description');
        })
        it('should have a Submit button', () => {
            const submitButton = wrapper.find('button').text();
            expect(submitButton).toBe('Add Graph');
        });
    })
    describe('Add Graph Button', () => {
        it('should be disabled when Graph Name and Graph Description fields are empty', () => {
            expect(wrapper.find('button#add-new-graph-button').props().disabled).toBe(true);
        });
        it('should be disabled when Graph Name field is empty', () => {
            inputGraphDescription('test');
            expect(wrapper.find('button#add-new-graph-button').props().disabled).toBe(true);
        })
        it('should be disabled when Graph Description field is empty', () => {
            inputGraphName('test');
            expect(wrapper.find('button#add-new-graph-button').props().disabled).toBe(true);
        })
        it('Should be enabled when Graph Name and Graph Description is not empty', () => {
            inputGraphName('test');
            inputGraphDescription('test');
            expect(wrapper.find('button#add-new-graph-button').props().disabled).toBe(false);


        })

    })
    function clickSubmit(): void {
        wrapper.find('button#add-new-graph-button').simulate('click');
    }
    function inputGraphName(graphName: string): void {
        wrapper.find('input#graph-id').simulate('change', {
            target: { value: graphName },
        });
    }
    function inputGraphDescription(graphDescription: string): void {
        wrapper.find('textarea#graph-description').simulate('change', {
            target: { value: graphDescription },
        });
        expect(wrapper.find('textarea#graph-description').props().value).toBe(graphDescription);
    }
})