<template>
	<Transition name="fade-down" appear>
		<div v-show="filterOptions.length" class="selected-filters-container">
			<div class="selected-filters-container__selected-filters">
				<div ref="filter_scroll" class="selected-filters-container__options">
					<CharacterSelectedFilterOption v-for="option in filterOptions" :key="option" :option="option" />
				</div>

			</div>
			<button @click.left="charactersStore.defaultFilter()"
				class="selected-filters-container__clear">Clear</button>
		</div>
	</Transition>
</template>

<script setup lang="ts">
//components
import CharacterSelectedFilterOption from './CharacterSelectedFilterOption.vue';

//stores
import { useCharacters } from '@/store/Characters';

//composables
import useCreateScroll from '@/Composables/useCreateScroll';

//vue
import { ref, onMounted } from 'vue'

const charactersStore = useCharacters()

const filterOptions = charactersStore.getSelectedFilterOptions
const filter_scroll = ref<HTMLDivElement | null>(null)
const { createScrolling } = useCreateScroll()

onMounted(() => {
	if (filter_scroll.value) {
		createScrolling(filter_scroll.value, 'horizontal')
	}
})
</script>


<style lang="scss">
.selected-filters-container {
	display: flex;
	left: 10px;
	width: calc(100% - 20px);
	position: absolute;
	height: fit-content;
	align-items: center;
	padding: 3px;
	z-index: 2;
	bottom: 50px;
	border-radius: 20px;
	background-color: rgba(202, 202, 202, 0.822);

	&__selected-filters {
		width: 100%;

		&::-webkit-scrollbar {
			width: 5px;
			height: 0px;
		}

		.selected-filters-container__options {
			display: flex;
			align-items: center;
			position: relative;
			gap: 10px;
			width: fit-content;
			cursor: grabbing;
		}
	}

	&__clear {
		background-color: #4b4a48;
		color: white;
		font-weight: bold;
		font-size: 18px;
		width: 80px;
		height: fit-content;
		margin-left: 10px;
		text-align: center;
		user-select: none;
		cursor: pointer;
		border-radius: 12px;
		padding: 1px 9px;
		border: 0;
	}
}

@media only screen and (max-width: 740px) {
	.selected-filters-container {
		bottom: 30px;
	}
}

@media only screen and (max-width: 915px) {
	.selected-filters-container {
		&__clear {
			width: 50px;
			font-size: 13px;
		}
	}


}
</style>