<template>
    <div class="main-container">
        <child>
            I am a child. My name is {{ name }}. This is my {{ value }}.
        </child>
        <transition name="fade">
            <div v-if="event">You dispatched {{ event }} event.</div>
        </transition>
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
            event: null,
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
        resetEvent() {
            setTimeout(() => this.event = null, 3000);
        },
    },
    created() {
        this.$on('close', () => {
            this.event = 'close';
            this.resetEvent();
        });
        this.$on('search', () => {
            this.event = 'search';
            this.resetEvent();
        });
    },
};
</script>

<style lang="scss" scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>

