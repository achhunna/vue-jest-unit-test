<template>
    <div class="main-container">
        <child>I am a child. My name is {{ name }}. This is my {{ value }}.</child>
        <button class="close-btn" @click="handleCloseBtnClick">Close</button>
        <button class="search-btn" @click="handleSearchBtnClick">Search</button>
    </div>
</template>

<script>
import Child from './Child';
import Constants from '../constants';

export default {
    name: 'app',
    components: {
        'child': Child
    },
    data() {
        return {
            name: Constants.name,
            value: Constants.value,
        }
    },
    methods: {
        handleCloseBtnClick() {
            this.$emit('close');
        },
        handleSearchBtnClick() {
            this.search();
        },
        search() {
            this.$emit('search');
        },
        asyncFunction() {
            setTimeout(() => this.$emit('asyncComplete'), 1000);
        },
    }
};
</script>

<style lang="scss" scoped>
</style>

