<template>
	<figure class="home-menu__user-exp">
		<img :src="HomeHelper.getHomeIcon('adventure')" />
		<section class="home-menu__experience">
			<section class="home-menu__experience-amount">
				<p>Adventure EXP</p>
				<span>{{ getUser.adventureExp }} / {{ getNextRankExp }}</span>
			</section>

			<progress :value="getUser.adventureExp" :max="getNextRankExp" />
		</section>
	</figure>
</template>


<script setup lang="ts">
import HomeHelper from '@/helpers/HomeHelper';
import { useUserData } from '@/store/Home/UserData';


const { getUser, getNextRankExp } = useUserData()

</script>


<style lang="scss">
@import '@/assets/Styles/HomeUI/text';

.home-menu__user-exp {
	display: flex;

	.home-menu__experience {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;

		.home-menu__experience-amount {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 12px;
			color: $transparentWhite;
		}

		progress {
			width: 100%;
			height: 10px;
		}
	}

	img {
		width: 25px;
		height: 25px;
	}
}

@media only screen and (max-width: 915px) {

	.home-menu__user-exp {
		.home-menu__experience {
			.home-menu__experience-amount {

				p,
				span {
					font-size: 8px;
				}

			}

			progress {
				height: 8px;
			}
		}

		img {
			width: 20px;
			height: 20px;
		}
	}

}
</style>