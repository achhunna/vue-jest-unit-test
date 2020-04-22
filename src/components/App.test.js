import { shallowMount } from '@vue/test-utils';
import Component from './App';

let wrapper;
const factory = (computed = {}) => {
    return shallowMount(Component, {
        propsData: {},
        mocks: {},
        stubs: {},
        methods: {},
        computed,
    });
};

beforeEach(() => {
    wrapper = factory();
});

afterEach(() => {
    wrapper.destroy();
});

jest.mock('../constants', () => ({
    firstName: 'Vue',
    lastName: 'Component',
}));
jest.useFakeTimers();

describe('Component', () => {
    test('is a Vue instance', () => {
        expect(wrapper.isVueInstance).toBeTruthy();
    });
    test('has main-container class', () => {
        expect(wrapper.contains('.main-container')).toBe(true);
    });
    test('emit events when close-btn clicked', () => {
        const closeBtn = wrapper.find('.close-btn');
        closeBtn.trigger('click');
        expect(wrapper.emitted().close.length).toBe(1);
    });
    test('clicking search button triggers search()', () => {
        wrapper.vm.search = jest.fn();
        const searchBtn = '.search-btn';
        wrapper.find(searchBtn).trigger('click');
        expect(wrapper.vm.search).toBeCalled();
    });
    test('checking data values from mocked module', () => {
        expect(wrapper.vm.firstName).toBe('Vue');
        expect(wrapper.vm.lastName).toBe('Component');
    });
    test('check asyncFunction() emits and sets value', async () => {
        const data = await wrapper.vm.asyncFunction();
        expect(wrapper.emitted().asyncComplete.length).toBe(1);
        expect(data).toEqual('Async complete');
    });
    test('check resetEvent() updates event', () => {
        wrapper.vm.handleCloseBtnClick(); // change event value
        wrapper.vm.resetEvent();
        jest.runOnlyPendingTimers();
        expect(wrapper.vm.event).toBe(null);
    });
    test('overriding computed value', () => {
        wrapper = factory({ fullName() { return 'New name' } });
        expect(wrapper.find('child-stub').text()).toBe('I am a child. My first name is Vue. My last name is Component. My full name is New name.');
    });
});