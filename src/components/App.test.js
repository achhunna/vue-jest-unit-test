import { shallowMount } from '@vue/test-utils';
import Component from './App';

let wrapper;

beforeEach(() => {
    wrapper = shallowMount(Component, {
        propsData: {},
        mocks: {},
        stubs: {},
        methods: {},
    });
});

afterEach(() => {
    wrapper.destroy();
});

jest.mock('../constants', () => ({
    name: 'Vue',
    value: 'Component',
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
        expect(wrapper.vm.name).toBe('Vue');
        expect(wrapper.vm.value).toBe('Component');
    });
    test('check asyncFunction', async() => {
        await wrapper.vm.asyncFunction();
        jest.runOnlyPendingTimers();
        expect(wrapper.emitted().asyncComplete.length).toBe(1);
    });
});