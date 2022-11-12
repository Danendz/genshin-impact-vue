<template>
	<section class="change-avatar-container__scroll">
		<section ref="scrollList" class="change-avatar-container__avatar-list">
			<PreventClickEvent :is-scrolling="isScrolling"
				@click-function="emit('setSelectedAvatar', character.name_key)" v-for="character in characters"
				:key="character.name_key" :class="['change-avatar-container__avatar',
					{ 'change-avatar-container__avatar_active': isSelectedAvatar(character.name_key) },
					{ 'change-avatar-container__avatar_current': isCurrentAvatar(character.name_key) }
				]">

				<CircleCharacter :name_key="character.name_key" />

				<figcaption v-if="isCurrentAvatar(character.name_key)">Current</figcaption>
			</PreventClickEvent>
		</section>
	</section>
</template>

<script setup lang="ts">
//components
import CircleCharacter from '@/components/UI/CircleCharacter.vue';
import PreventClickEvent from '@/components/ComponentHelpers/PreventClickEvent.vue';

//interfaces
import { ISelectedAvatar } from '@/Interfaces/SelectedAvatar';
import { Character } from '@/Interfaces/CharacterInterface';

//composables
import useCreateScroll from '@/Composables/useCreateScroll';

//vue
import { ref, onMounted } from 'vue';

const props = defineProps<{
	selectedAvatar: ISelectedAvatar,
	characters: Character[],
	currentAvatar: string
}>()

const emit = defineEmits<{
	(e: 'setSelectedAvatar', name_key: string): void;
}>()

const isSelectedAvatar = (name_key: string) => props.selectedAvatar.name_key === name_key;
const isCurrentAvatar = (name_key: string) => props.currentAvatar === name_key;

const scrollList = ref<HTMLElement | null>(null)
const { isScrolling, createScrolling } = useCreateScroll()

onMounted(() => {
	if (scrollList.value) {
		createScrolling(scrollList.value, 'vertical')
	}
})

</script>

<style lang="scss">
.change-avatar-container__scroll {
	width: 60%;
	height: 100%;
}

.change-avatar-container__avatar-list {
	display: grid;
	gap: 5px;
	grid-template-columns: repeat(auto-fill, 110px);
	grid-auto-rows: 110px;
	justify-content: center;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: rgba(0, 0, 0, 0.158);
	padding: 10px;
	width: 100%;
	height: fit-content;
	border-radius: 10px;

	.change-avatar-container__avatar {
		display: flex;
		padding: 10px;
		justify-content: center;
		position: relative;
		z-index: 0;
		transition: all .2s;
		cursor: pointer;
		border-radius: 5px;
		border: 2px solid transparent;

		&_active {
			background-color: #ede5da;
		}

		&_current {
			border-color: #ede5da;
		}

		&::before {
			content: '';
			position: absolute;
			width: 100%;
			height: 100%;
			transform: scale(0.92);
			top: 0;
			z-index: -1;
			border-radius: 50%;
			background-color: rgb(255, 255, 255);
			opacity: 0.3;
		}

		&:hover {
			background-color: #ede5da;
		}

		figcaption {
			position: absolute;
			bottom: 0;
			user-select: none;
			width: 100%;
			text-align: center;
			color: #323646;
			background-color: #ede5da;
		}
	}
}

@media only screen and (orientation: portrait) {
	.change-avatar-container__scroll {
		width: 100%;
		height: 60%;
	}
}

@media only screen and (orientation: portrait) and (max-width: 600px) {
	.change-avatar-container__avatar-list {
		grid-template-columns: repeat(auto-fill, 90px);
		grid-auto-rows: 90px;

		.change-avatar-container__avatar {
			padding: 5px;

			&::before {
				transform: scale(0.97);
			}
		}
	}
}

@media only screen and (orientation: landscape) and (max-width: 915px) {
	.change-avatar-container__avatar-list {
		grid-template-columns: repeat(auto-fill, min(14vw, 80px));
		grid-auto-rows: min(14vw, 80px);

		.change-avatar-container__avatar {
			padding: 7px;
		}
	}
}
</style>