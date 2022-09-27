<template>
    <div @mouseup="handleMouseup" @mousemove="handleMousemove" @mousedown="handleMousedown">
        <slot />
    </div>
</template>

<script setup lang="ts">

import { ref } from 'vue';

interface Props {
    index: number
}
const props = defineProps<Props>()
const emit = defineEmits<{
    (event: 'click-function', index: number): void
}>()

const mousemoved = ref(false);
const clicked = ref(false)

const handleMousedown = () => {
    clicked.value = true
}
const handleMousemove = () => {
    if (clicked.value) {
        mousemoved.value = true
    }
}

const handleMouseup = (): void => {
    if (!mousemoved.value) {
        emit('click-function', props.index)
    }
    clicked.value = false
    mousemoved.value = false
}
</script>