<template>
	<section class="home-menu__user-birthday home-info-default-text">
		<p>Birthday</p>
		<span>{{ props.user.birthday.month }}/{{ props.user.birthday.day }}</span>
	</section>
</template>

<script setup lang="ts">
import { IUser } from '@/store/Home/UserData';


const props = defineProps<{
	user: IUser
}>()

</script>


<style lang="scss">
@import '@/assets/Styles/HomeUI/text';

.home-menu__user-birthday {
	display: flex;
	font-size: 15px;
	justify-content: space-between;
}
</style>