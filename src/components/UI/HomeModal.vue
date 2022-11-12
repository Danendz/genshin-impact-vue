<template>
	<section class="home-modal">
		<header>
			<h2>{{ props.title }}</h2>
			<BackButton @click="emit('setModal', false)" :button-type="'close'" :is-with-background="false"
				class="home-modal__close-button" :color="'#D5BB94'" />
		</header>
		<div class="home-modal__line"></div>
		<section class="home-modal__inner-content">
			<slot />
		</section>
		<div v-if="secondLine" class="home-modal__line"></div>
	</section>
</template>



<script setup lang="ts">
import BackButton from './BackButton.vue';

interface Props {
	title: string,
	secondLine?: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{
	(e: 'setModal', value: boolean): void
}>()

</script>


<style lang="scss">
.home-modal {
	position: fixed;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	width: 100%;
	position: relative;
	height: 100%;
	background-color: #3F4557;
	z-index: 0;
	user-select: none;

	&::before {
		content: '';
		position: absolute;
		top: 0;
		width: 100%;
		height: 99.6%;
		transform: scale(0.98);
		border-radius: 10px;
		z-index: -1;
		border: 1px solid white;
	}

	header {
		display: flex;
		align-items: center;
		width: 90%;
		padding: 10px;
		margin-top: 5px;

		h2 {
			color: #D5BB94;
			font-family: Genshin, Arial, Helvetica, sans-serif;
			font-weight: 100;
			font-size: 35px;
			margin-left: auto;
			margin-right: auto;
		}

		.home-modal__close-button {
			font-size: 25px;
			width: 45px;
			height: 45px;
		}
	}

	&__line {
		width: 90%;
		height: 2px;
		background-color: white;
	}

	&__inner-content {
		width: 90%;
		padding: 15px 0;
		height: 85%;
	}
}

@media only screen and (max-width: 915px) {
	.home-modal {
		width: 90%;
		height: 90%;

		header {
			padding: 5px;

			h2 {
				font-size: 20px;
			}

			.home-modal__close-button {
				font-size: 17px;
				width: 35px;
				height: 35px;
			}
		}

		&__inner-content {
			height: 80%;
			overflow: hidden;
			padding: 5px 0;
		}
	}
}

@media only screen and (orientation: portrait) {
	.home-modal {
		width: 95%;

		&__inner-content {
			height: 85%;
		}
	}
}
</style>