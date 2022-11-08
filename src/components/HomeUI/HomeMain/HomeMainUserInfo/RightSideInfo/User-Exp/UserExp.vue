<template>
	<figure class="home-menu__user-exp">
		<img :src="HomeHelper.getHomeIcon('adventure')" />
		<section class="home-menu__experience">
			<section class="home-menu__experience-amount">
				<p>Adventure EXP</p>
				<span>5206 / 285750</span>
			</section>

			<progress value="10" max="100" />
		</section>
	</figure>
</template>


<script setup lang="ts">
import HomeHelper from '@/helpers/HomeHelper';

</script>


<style lang="scss">
.home-menu__user-exp {
	display: flex;

	.home-menu__experience {
		display: flex;
		flex-direction: column;
		width: 100%;

		.home-menu__experience-amount {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;
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

@media only screen and (max-width: 915px) and (orientation: landscape) {

	.home-menu__user-exp {
		.home-menu__experience {
			.home-menu__experience-amount {

				p,
				span {
					font-size: 10px;
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