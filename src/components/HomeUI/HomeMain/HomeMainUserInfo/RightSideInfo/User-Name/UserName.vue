<template>
	<figure class="home-menu__user-name">
		<figcaption>Даня</figcaption>
		<button>
			<Icon icon="bxs:edit-alt" />
		</button>
	</figure>
</template>


<script setup lang="ts">
import { Icon } from '@iconify/vue';

</script>


<style lang="scss">
@import '@/assets/Styles/HomeUI/RightSideInfo';

.home-menu__user-name {
	display: flex;
	justify-content: space-between;
	align-items: center;
	background: $backgroundGradient;

	figcaption {
		color: #e9e6e6;
		font-weight: bold;
		font-size: 28px;
	}

	button {
		background-color: #ebe6d6;
		width: 25px;
		height: 25px;
		font-size: 20px;
		border-radius: 3px;
	}
}


@media only screen and (max-width: 915px) {
	.home-menu__user-name {
		figcaption {
			font-size: 16px !important;
		}

		button {
			width: 15px;
			height: 15px;
			font-size: 14px;
		}
	}
}
</style>