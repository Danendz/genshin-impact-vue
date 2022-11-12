<template>
	<section class="change-avatar-container__selected-avatar">

		<CircleCharacter :delay="0" class="change-avatar-container__selected-avatar-img"
			:name_key="props.selectedAvatar.name_key" />

		<p class="change-avatar-container__selected-avatar-name">{{ selectedAvatar.name }}</p>

		<RoundedButtonWithCircle @click="emit('confirmSelection')" :title="'Use'" />

	</section>
</template>


<script setup lang="ts">
//components
import CircleCharacter from '@/components/UI/CircleCharacter.vue';
import RoundedButtonWithCircle from '@/components/UI/RoundedButtonWithCircle.vue'

//interfaces
import { ISelectedAvatar } from '@/Interfaces/SelectedAvatar';

const props = defineProps<{
	selectedAvatar: ISelectedAvatar
}>()

const emit = defineEmits<{
	(e: 'confirmSelection'): void
}>();

</script>


<style lang="scss">
.change-avatar-container__selected-avatar {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 40%;
	height: 100%;
	position: relative;

	&-img {
		max-width: 150px;
		max-height: 150px;
		margin-top: 20%;
		margin-bottom: 20%;
	}

	&-name {
		width: 100%;
		user-select: none;
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 20px;
		padding: 16px 0;
		color: #d0be9a;
		background: linear-gradient(90deg, rgba(163, 69, 219, 0) 0%, rgba(0, 0, 0, 0.267) 50%, rgba(163, 69, 219, 0) 100%);
	}

	button {
		margin-top: auto;
	}
}

@media only screen and (orientation: portrait) {
	.change-avatar-container__selected-avatar {
		width: 100%;
		height: 40%;
		justify-content: space-between;

		&-img {
			max-width: 80px;
			max-height: 80px;
			margin: 0;
		}

		&-name {
			padding: 10px 0;
			margin: 0;
		}

		button {
			margin: 0;
		}
	}
}


@media only screen and (orientation: landscape) and (max-height: 520px) {
	.change-avatar-container__selected-avatar {
		justify-content: space-around;

		&-img {
			max-width: 30vh;
			max-height: 30vh;
			margin: 0;
		}

		&-name {
			font-size: 16px;
			padding: 10px 0;
			margin: 0;
		}

		button {

			margin: 0;
		}
	}
}
</style>