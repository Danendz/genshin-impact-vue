<template>
	<section class="home-menu__user-info-container">
		<div :style="{ backgroundImage: `url(${CharacterHelper.getCharacterImage('sucrose', CharacterImage.NAMECARD_HQ)})` }"
			class="home-menu__user-info-image"></div>
		<section class="home-menu__user-info">
			<LeftSideInfo />
			<RightSideInfo />
		</section>
	</section>
</template>

<script setup lang="ts">
import { CharacterImage } from '@/Enums/CharacterEnums';
import CharacterHelper from '@/helpers/CharacterHelper';
import LeftSideInfo from './LeftSideInfo/LeftSideInfo.vue';
import RightSideInfo from './RightSideInfo/RightSideInfo.vue';


</script>

<style lang="scss">
.home-menu {

	&__user-info-container {
		display: flex;
		justify-content: center;
		width: 100%;
		position: relative;

		.home-menu__user-info-image {
			width: 100%;
			height: 100%;

			position: absolute;
			background-repeat: no-repeat;
			background-position: center;
			background-size: cover;
			z-index: 0;
		}

		.home-menu__user-info {
			display: flex;
			padding: 15px;
			width: 100%;
			justify-content: space-between;
			align-items: center;
			z-index: 1;

			figcaption,
			p,
			span {
				color: #ffffffaf;
				font-weight: bold;
			}

			button {
				cursor: pointer;
				outline: none;
				border: 0;
				display: flex;
				justify-content: center;
				align-items: center;
			}

			.home-menu__info-button {
				background-color: #ebe6d6;
				width: 18px;
				height: 18px;
				font-size: 65%;
				border-radius: 50%;
			}
		}
	}

}

@media only screen and (max-width: 915px) {
	.home-menu {
		&__user-info-container {

			.home-menu__user-info {
				padding: 5px;
				padding-right: 10px;
				gap: 5px;
				max-width: 500px;

				figcaption,
				p,
				span {
					font-size: 13px;
				}

				.home-menu__info-button {
					width: 13px;
					height: 13px;
					font-size: 8px;
				}
			}
		}
	}
}

@media only screen and (orientation: portrait) {
	.home-menu {
		&__user-info-container {
			width: 95%;
			max-width: 450px;
			margin-top: 5px;
			border-radius: 10px;

			.home-menu__user-info-image {
				opacity: 0.95;
				border-radius: 10px;
			}
		}
	}
}
</style>