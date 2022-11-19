<template>
	<Transition name="fade" appear>
		<section class="home-settings" v-show="props.state">
			<header>
				<section>
					<Icon class="home-settings__icon" icon="ci:settings-filled" />
					<h4>{{ t('home.settings.settings') }} / {{ t(`home.settings.titles.${activeOption}`) }}</h4>
					<BackButton :button-type="'close'" :is-with-background="true"
						@click="emit('set-option-state', 'settings', false)" />
				</section>
			</header>
			<section class="home-settings__main">
				<section class="home-settings__options">
					<ul>
						<ListItemRhombus v-for="option in optionsList" :key="option"
							:is-active="activeOption === option" :text="t(`home.settings.titles.${option}`)"
							@click="setActiveOption(option)" />
					</ul>
				</section>
				<section class="home-settings__active-option-content">
					<h5>{{ t(`home.settings.titles.${activeOption}`) }}</h5>
					<section class="home-settings__active-list">
						<component :is="content_component" />
					</section>
				</section>
			</section>
		</section>
	</Transition>
</template>


<script setup lang="ts">
//components
import BackButton from '@/components/UI/BackButton.vue';
import ListItemRhombus from '@/components/UI/list/ListItemRhombus.vue';
import { HomeOptionStates } from '@/Interfaces/HomeOptionsStates';
import { Icon } from '@iconify/vue';
import { ref, computed, defineAsyncComponent } from 'vue';
import { useGetTranslator } from '@/Composables/useGetTranslator';

const props = defineProps<{
	state: boolean
}>()

const emit = defineEmits<{
	(e: 'set-option-state', key: keyof HomeOptionStates, value: boolean): void
}>()

type Options = "language" | "other"

const optionsList: Options[] = ["language", 'other']

type IComponentList = {
	[key in Options]: () => Promise<ReturnType<typeof defineAsyncComponent>>
}

const componentsList: IComponentList = {
	language: () => import('./Language/HomeLanguage.vue'),
	other: () => import('./Language/HomeLanguage.vue')
}

const activeOption = ref<Options>(optionsList[0])

const { t } = useGetTranslator()

const setActiveOption = (option: Options) => {
	activeOption.value = option
}

const content_component = computed(() => {
	return defineAsyncComponent(componentsList[activeOption.value])
})


</script>


<style lang="scss">
.home-settings {
	width: 100%;
	height: 100vh;
	position: absolute;
	display: flex;
	gap: 20px;
	align-items: center;
	flex-direction: column;
	background-color: rgba(0, 0, 0, 0.281);

	top: 0;

	header {
		display: flex;
		justify-content: center;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.39);

		section {
			width: 100%;
			max-width: 1600px;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 10px;
			color: #c7b18c;

			.home-settings__icon {
				font-size: 35px;
			}

			h4 {
				margin-left: 10px;
			}

			button {
				margin-left: auto;
				margin-right: 5px;
			}
		}
	}

	.home-settings__main {
		display: flex;
		gap: 20px;
		width: 100%;
		height: 100%;
		max-width: 1500px;
		padding: 0px 10px;

		.home-settings__options {
			width: 20%;
			height: 90%;
			overflow-y: auto;

			ul {
				width: fit-content;
				font-size: 20px;
				padding-left: 2px;
			}
		}

		.home-settings__active-option-content {
			width: 100%;
			height: 90%;
			padding-right: 10px;

			.home-settings__active-list {
				height: 100%;
				max-height: 800px;
				overflow-y: auto;
				padding-right: 10px;
			}

			h5 {
				font-size: 20px;
				color: white;
				margin-bottom: 10px;
			}
		}
	}
}


@media only screen and (max-width: 915px) {
	.home-settings {
		gap: 15px;

		header {
			section {
				padding: 6px;

				.home-settings__icon {
					font-size: 30px;
				}
			}
		}

		.home-settings__main {
			.home-settings__options {
				ul {
					font-size: 17px;
				}
			}

			.home-settings__active-option-content {
				h5 {
					font-size: 17px;
				}
			}
		}
	}
}


@media only screen and (orientation: portrait) {
	.home-settings {
		.home-settings__main {
			padding: 0 5px;
			flex-direction: column-reverse;
			justify-content: flex-end;

			.home-settings__active-option-content {
				padding-right: 0;

				.home-settings__active-list {
					padding-right: 0;
				}
			}

			.home-settings__options {
				overflow-x: auto;
				overflow-y: hidden;
				display: flex;
				background-color: rgba(0, 0, 0, 0.123);

				height: fit-content;
				width: 100%;
				padding: 5px;
				border-radius: 10px;

				&::-webkit-scrollbar {
					height: 0px;
				}

				ul {
					display: flex;
					gap: 10px;
				}
			}
		}
	}
}
</style>
