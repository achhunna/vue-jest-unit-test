<template>
    <div class="main-container">
        <child>
            I am a child. My first name is {{ firstName }}. My last name is {{ lastName }}. My full name is {{ fullName }}.
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
            firstName: Constants.firstName,
            lastName: Constants.lastName,
            event: null,
        }
    },
    computed: {
        fullName() {
            return `${this.firstName} ${this.lastName}`;
        },
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
            return new Promise((resolve, reject) => {
                    resolve();
                }).then(() => {
                    this.$emit('asyncComplete');
                    return 'Async complete';
                });
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

