<template>
	<section class="home-menu__right-side-info">
		<UserName :user="getUser" />
		<UserDescription :user="getUser" />
		<UserRank :user="getUser" />
		<UserExp />
		<UserWorldLvl />
		<UserBirthday :user="getUser" />
	</section>
</template>


<script setup lang="ts">
//components
import UserName from './User-Name/UserName.vue';
import UserDescription from './User-Description/UserDescription.vue';
import UserRank from './User-Rank/UserRank.vue';
import UserExp from './User-Exp/UserExp.vue';
import UserWorldLvl from './User-World-Lvl/UserWorldLvl.vue';
import UserBirthday from './User-Birthday/UserBirthday.vue';

//store
import { useUserData } from '@/store/Home/UserData';

const { getUser } = useUserData()


</script>


<style lang="scss">
.home-menu__right-side-info {
	display: flex;
	flex-direction: column;
	gap: 5px;
	width: 70%;
}

@media only screen and (max-width: 915px) {
	.home-menu__right-side-info {
		width: 70%;
		gap: 3px;
	}

}
</style>