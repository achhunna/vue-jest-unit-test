<template>
    <div class="header">
        <slot>Default value</slot>
    </div>
</template>

<script>
export default {
    name: 'child',
};
</script>

<style lang="scss" scoped>
.header {
    font-size: 48px;
}
</style>

