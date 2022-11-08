<template>
	<figure class="home-menu__user-rank">
		<figcaption>Adventure Rank </figcaption>
		<span>57</span>
		<button class="home-menu__info-button">
			<Icon icon="fa6-solid:info" />
		</button>
	</figure>
</template>


<script setup lang="ts">
import { Icon } from '@iconify/vue';


</script>


<style lang="scss">
@import '@/assets/Styles/HomeUI/RightSideInfo';

.home-menu__user-rank {
	display: flex;
	font-size: 20px;
	background: $backgroundGradient;
	align-items: center;
	justify-content: center;

	span {
		margin-left: auto;
		margin-right: 5px;
	}
}
</style>