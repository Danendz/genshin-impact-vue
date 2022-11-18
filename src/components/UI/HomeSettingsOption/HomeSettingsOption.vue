<template>
	<section class="home-settings__option">
		<p class="home-settings__title">{{ title }}</p>
		<TogglerWithList :is-centered="true" class="home-settings__select" :direction="direction ?? 'top'"
			@choose-option="props.chooseOption" :active-option="activeOption" :options="options"
			:translate-path="translatePath" />
	</section>
</template>


<script setup lang="ts">
import TogglerWithList from '../toggler/TogglerWithList.vue';

interface Props {
	activeOption: string,
	options: string[],
	translatePath: string,
	chooseOption: (value: string) => void,
	title: string,
	direction?: 'top' | 'bottom'
}

const props = defineProps<Props>()

</script>


<style lang="scss">
.home-settings__option {
	display: flex;
	justify-content: space-between;
	width: 100%;
	align-items: center;
	background-color: #cac8cb;
	border-radius: 20px;
	height: 35px;

	.home-settings__title {
		color: #51586b;
		font-size: 18px;
		margin-left: 10px;
	}

	.home-settings__select {
		width: 100%;
		max-width: 250px;
		height: 100%;

		button {
			border-radius: 20px;
			justify-content: center;
			border-bottom-left-radius: 0;
			border-top-left-radius: 0;
			background-color: #c3bab1;

			span {
				margin-left: auto;
			}

			img {
				margin-left: auto;
			}
		}
	}
}

@media only screen and (max-width: 915px) {
	.home-settings__option {
		height: 30px;

		.home-settings__title {
			font-size: 15px;
		}

		.home-settings__select {
			max-width: 200px;
		}
	}
}


@media only screen and (orientation: portrait) {
	.home-settings__option {
		.home-settings__title {
			font-size: 12px;
		}

		.home-settings__select {
			max-width: 150px;
		}
	}
}
</style>