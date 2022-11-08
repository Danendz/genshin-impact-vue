<template>
	<figure class="home-menu__user-world-lvl">
		<figcaption>World Level</figcaption>
		<span>8</span>
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

.home-menu__user-world-lvl {
	display: flex;
	align-items: center;
	background: $backgroundGradient;
	font-size: 20px;

	span {
		margin-left: auto;
		margin-right: 5px;
	}
}
</style>