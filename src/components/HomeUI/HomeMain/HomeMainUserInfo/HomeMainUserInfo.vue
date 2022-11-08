<template>
	<section class="home-menu__user-info-container"
		:style="{ backgroundImage: `url(${CharacterHelper.getCharacterImage('sucrose', CharacterImage.NAMECARD_HQ)})` }">

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
		background-repeat: no-repeat;
		background-position: center;
		background-size: cover;

		.home-menu__user-info {
			display: flex;
			padding: 15px;
			width: 100%;
			justify-content: space-between;
			align-items: center;

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
			width: 100%;

			.home-menu__user-info {
				padding: 5px;
				gap: 5px;
				max-width: 500px;

				figcaption,
				p,
				span {
					font-size: 13px;
				}
			}

			.home-menu__info-button {
				width: 13px;
				height: 13px;
				font-size: 10px;
			}
		}
	}
}
</style>