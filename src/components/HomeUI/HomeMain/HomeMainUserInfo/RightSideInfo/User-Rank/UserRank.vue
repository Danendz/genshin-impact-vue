<template>
	<figure class="home-menu__user-rank home-info-default-text">
		<figcaption>{{ title }}:</figcaption>
		<span>{{ props.user.adventureRank }}</span>
		<button class="home-menu__info-button">
			<Icon icon="fa6-solid:info" />
		</button>
	</figure>
</template>


<script setup lang="ts">
import { IUser } from '@/store/Home/UserData';
import { Icon } from '@iconify/vue';

const props = defineProps<{
	user: IUser,
	title: string
}>()

</script>


<style lang="scss">
@import '@/assets/Styles/HomeUI/RightSideInfo';
@import '@/assets/Styles/HomeUI/text';

.home-menu__user-rank {
	display: flex;
	font-size: 17px;
	background: $backgroundGradient;
	align-items: center;
	justify-content: center;

	span {
		margin-left: auto;
		margin-right: 5px;
	}
}
</style>