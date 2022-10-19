<template>
	<button class="button-with-icon">
		<Icon :class="iconClass" :icon="props.icon" />
	</button>
</template>

<script setup lang="ts">
//iconify
import { Icon } from '@iconify/vue';

interface Props {
	icon: string;
	iconClass: string | (string | Record<string, boolean>)[];
}

const props = defineProps<Props>()

</script>


<style lang="scss">
.button-with-icon {
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;
	overflow: hidden;
}
</style>