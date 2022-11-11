<template>
	<p class="home-menu__user-description home-info-default-text">{{ props.user.description }}</p>
</template>

<script setup lang="ts">
import { IUser } from '@/store/Home/UserData';

const props = defineProps<{
	user: IUser
}>()

</script>

<style lang="scss">
@import '@/assets/Styles/HomeUI/text';

.home-menu__user-description {
	height: 40px;
	font-weight: bold;
	font-size: 15px;
}

@media only screen and (max-width: 915px) {
	.home-menu__user-description {
		height: 25px;
	}
}
</style>