<template>
	<section class="home-menu__right-side-info">
		<UserName :user="getUser" />
		<UserDescription :user="getUser" />
		<UserRank :title="t('home.user-info.adventure-rank')" :user="getUser" />
		<UserExp :title="t('home.user-info.adventure-exp')" />
		<UserWorldLvl :title="t('home.user-info.world-level')" />
		<UserBirthday :title="t('home.user-info.birthday')" :user="getUser" />
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

//composables
import { useGetTranslator } from '@/Composables/useGetTranslator';

//store
import { useUserData } from '@/store/Home/UserData';

const { getUser } = useUserData()
const { t } = useGetTranslator()

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