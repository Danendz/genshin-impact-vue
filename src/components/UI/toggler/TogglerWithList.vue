<template>
	<section class="toggler-with-list">
		<ToggleList :is-centered="isCentered" :direction="direction" :options="options" @choose-option="chooseOption"
			:translate-path="translatePath" :active-option="activeOption" :active-state="activeState" />
		<button @click="toggleOptions">
			<span>{{ activeOption
					? t(`${props.translatePath}.${activeOption}`)
					: t('characters.sort-options.all')
			}}</span>

			<img alt="arrow" :class="[{ 'toggler-with-list__arrow_active': activeState }]"
				src="@/assets/Icons/triangle-up.webp" />

		</button>
	</section>
</template>


<script setup lang="ts">
import ToggleList from './ToggleList.vue';
import { ref } from 'vue'
import { useGetTranslator } from '@/Composables/useGetTranslator';

interface Props {
	translatePath: string,
	activeOption: string,
	options: string[],
	direction?: 'top' | 'bottom',
	isCentered?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<{
	(e: 'choose-option', value: string): void
}>()

const activeState = ref(false)
const { t } = useGetTranslator()

const toggleOptions = () => {
	activeState.value = !activeState.value
}

const chooseOption = (value: string) => {
	emit('choose-option', value)
	toggleOptions()
}

</script>


<style lang='scss'>
.toggler-with-list {
	height: 30px;
	width: 70%;
	position: relative;

	button {
		background-color: white;
		display: flex;
		cursor: pointer;
		border: 0;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		border-radius: 20px;
		height: 100%;
		z-index: 1;

		img {
			width: 10px;
			height: auto;
			margin-right: 10px;
			transition: .3s;
		}

		span {
			color: #4a5267;
			font-size: 15px;
			margin-left: 10px;
		}
	}

	&__arrow_active {
		transform: rotate(180deg);
	}
}

@media only screen and (max-width: 915px) {
	.toggler-with-list {
		height: 23px;

		span {
			font-size: 12px;
		}

		img {
			width: 7px;
		}

		width: 60%
	}
}

@media only screen and (max-width: 740px) {
	.toggler-with-list {
		height: 20px;
	}
}
</style>