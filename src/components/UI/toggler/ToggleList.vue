<template>
	<Transition name="fade">
		<section :style="{ [direction]: '100%' }" ref="target" v-if="props.activeState"
			class="toggle-options-container">
			<figure v-for="option in options" :key="option" @click="() => emit('choose-option', option)"
				:class="['toggle-options-container__option', { 'toggle-options-container__option_active': activeOption === option }]">

				<p :style="{ marginLeft: isCentered ? 'auto' : 'unset' }">{{ option
						? t(`${translatePath}.${option}`)
						: t('characters.sort-options.all')
				}}</p>
				<Icon :style="{ marginLeft: isCentered ? 'auto' : 'unset' }" icon="icon-park-solid:correct"
					:class="['toggle-options-container__current-icon', { 'toggle-options-container__current-icon_active': activeOption === option }]" />
			</figure>
		</section>
	</Transition>
</template>


<script setup lang="ts">
import { useGetTranslator } from '@/Composables/useGetTranslator';
import { Icon } from '@iconify/vue'

interface Props {
	activeState: boolean,
	options: string[],
	activeOption: string,
	translatePath: string,
	direction: 'top' | 'bottom',
	isCentered?: boolean
}

const props = withDefaults(defineProps<Props>(), {
	direction: 'bottom'
})
const emit = defineEmits<{
	(e: "choose-option", value: string): void
}>()

const { t } = useGetTranslator()

</script>


<style lang="scss">
.toggle-options-container {
	position: absolute;
	display: flex;
	flex-direction: column;
	justify-content: center;
	gap: 2px;
	padding: 4px 4px;
	z-index: 3;
	width: 100%;
	border-radius: 15px;
	background-color: #4a5267;

	&__option {
		color: #e2e2e2;
		padding: 6px;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: space-between;
		user-select: none;
		border-radius: 15px;
		transition: .2s;

		.toggle-options-container__current-icon {
			opacity: 0;

			&_active {
				opacity: 1;
			}
		}

		p {
			font-size: 15px;
		}

		&:hover {
			background-color: rgba(255, 255, 255, 0.103);
		}

		&_active {
			background-color: rgba(255, 255, 255, 0.178);
		}
	}
}

@media only screen and (max-width: 915px) {
	.toggle-options-container {
		&__option {
			padding: 4px;

			p {
				font-size: 12px;
			}
		}
	}
}

@media only screen and (max-width: 740px) {
	.toggle-options-container {

		border-radius: 10px;


		&__option {
			padding: 4px;

			border-radius: 10px;

			img {
				width: 10px;
				height: 10px;
			}
		}
	}
}
</style>