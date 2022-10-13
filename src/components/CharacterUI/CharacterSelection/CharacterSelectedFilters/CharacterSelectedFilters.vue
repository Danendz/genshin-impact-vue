<template>
	<Transition name="fade-down" appear>
		<div v-show="filterOptions.length" class="selected-filters">
			<div ref="filter_scroll" class="selected-filters__options">
				<CharacterSelectedFilterOption v-for="option in filterOptions" :key="option" :option="option" />
			</div>
			<div @click.left="charactersStore.defaultFilter()" class="selected-filters__clear">Clear</div>
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


onMounted(() => {
	if (filter_scroll.value) {
		useCreateScroll(filter_scroll.value, 'horizontal')
	}
})
</script>


<style lang="scss">
.selected-filters {
	position: absolute;
	display: flex;
	align-items: center;
	left: 10px;

	z-index: 2;
	width: calc(100% - 20px);
	height: fit-content;
	padding: 3px;
	bottom: 50px;
	background-color: rgba(202, 202, 202, 0.822);
	border-radius: 20px;

	&__options {
		display: flex;
		align-items: center;
		gap: 10px;
		width: 100%;
		overflow-x: auto;
		cursor: grabbing;

		&::-webkit-scrollbar {
			width: 5px;
			height: 0px;
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
		padding: 0px 5px;
	}
}

@media only screen and (max-width: 740px) {
	.selected-filters {
		bottom: 30px;
	}
}

@media only screen and (max-width: 915px) {
	.selected-filters {
		padding: 2px 5px;

		&__options {
			width: 80%;
		}

		&__clear {
			width: 50px;
			font-size: 12px;
		}
	}


}
</style>