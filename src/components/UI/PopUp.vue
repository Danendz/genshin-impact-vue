<template>
	<Transition name="fade" appear>
		<section v-show="isVisible" :class="['popup', props.popupClass]">
			<p>{{ popupText }}</p>
			<div v-if="arrowClass" :class="['popup__arrow', arrowClass]"></div>
		</section>
	</Transition>
</template>


<script setup lang="ts">
import { watch } from 'vue';

interface Props {
	popupClass: string,
	arrowClass?: string,
	popupText: string,
	isVisible: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
	(e: 'hidePopup', value: boolean): void
}>()

let timeout: number;

watch(() => props.isVisible, () => {
	if (props.isVisible) {
		clearTimeout(timeout)
		timeout = setTimeout(() => {
			emit('hidePopup', false)
		}, 1000);
	}
})

</script>


<style lang="scss">
.popup {
	width: fit-content;
	position: absolute;
	background-color: rgba(0, 0, 0, 0.411);
	border-radius: 10px;
	display: flex;
	justify-content: center;
	user-select: none;
	z-index: 10;

	p {
		color: white !important;
		font-size: 16px;
		width: fit-content;
		height: fit-content;
		padding: 5px;
		white-space: nowrap;
	}

	&__arrow {
		position: absolute;

		clip-path: polygon(50% 0%, 0% 100%, 100% 100%);
		width: 15px;
		height: 15px;
		background-color: rgba(0, 0, 0, 0.411);
	}
}


@media only screen and (max-width: 915px) {
	.popup {
		&__arrow {
			width: 10px;
			height: 10px;
		}
	}
}
</style>