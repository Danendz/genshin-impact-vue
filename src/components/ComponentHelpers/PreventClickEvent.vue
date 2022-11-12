<template>
    <div @contextmenu="disableContextMenu" @mouseup.left="handleMouseup" @mousemove.left="handleMousedown">
        <slot />
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

interface Props {
    index?: number,
    isScrolling: boolean
}
const props = defineProps<Props>()
const emit = defineEmits<{
    (event?: 'click-function', index?: number): void
}>()

const mousemoved = ref(false)

const disableContextMenu = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    event.stopImmediatePropagation();
    return false;
}

const handleMousedown = () => {
    if (props.isScrolling) {
        mousemoved.value = true
    }
}

const handleMouseup = (): void => {
    if (!mousemoved.value) {
        emit('click-function', props.index)
    }
    mousemoved.value = false
}
</script>