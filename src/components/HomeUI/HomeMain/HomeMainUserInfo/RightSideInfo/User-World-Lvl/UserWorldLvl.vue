<template>
	<figure class="home-menu__user-world-lvl home-info-default-text">
		<figcaption>World Level</figcaption>
		<span>{{ getUserWorldLvl }}</span>
		<button class="home-menu__info-button">
			<Icon icon="fa6-solid:info" />
		</button>
	</figure>
</template>


<script setup lang="ts">
import { Icon } from '@iconify/vue';

import { useUserData } from '@/store/Home/UserData'

const { getUserWorldLvl } = useUserData()


</script>


<style lang="scss">
@import '@/assets/Styles/HomeUI/RightSideInfo';
@import '@/assets/Styles/HomeUI/text';

.home-menu__user-world-lvl {
	display: flex;
	align-items: center;
	background: $backgroundGradient;
	font-size: 17px;

	span {
		margin-left: auto;
		margin-right: 5px;
	}
}
</style>