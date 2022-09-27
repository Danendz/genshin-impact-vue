<template>
    <img v-lazy="{
        src: props.options.src,
        loading: props.options.loading
    }" @mousedown="(e: MouseEvent) => e.preventDefault()" :alt="`${props.options.alt}`" />
</template>

<script setup lang="ts">
interface Props {
    options: {
        src: string,
        loading?: string
        alt?: string
    }
}
const props = defineProps<Props>()
</script>