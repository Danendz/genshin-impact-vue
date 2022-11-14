<template>
    <div @contextmenu="cancelContext" :class="[{ 'scrolling-active': isScrolling }]"
        @click="emit('click-function', props.index)">
        <slot />
    </div>
</template>

<script setup lang="ts">
interface Props {
    index?: number,
    isScrolling: boolean
}
const props = defineProps<Props>()

const cancelContext = (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
    return false;
}

const emit = defineEmits<{
    (event?: 'click-function', index?: number): void
}>()

</script>

<style lang="scss">
.scrolling-active {
    pointer-events: none;
}
</style>
