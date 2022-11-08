<template>
	<figure class="home-menu__left-side-info">
		<img draggable="false" :src="CharacterHelper.getCharacterImage('sucrose', CharacterImage.ICON_BIG_LQ)" />
		<figcaption>UID 700055420</figcaption>
		<button>
			<Icon icon="material-symbols:file-copy-sharp" />Copy
		</button>
	</figure>
</template>


<script setup lang="ts">
import CharacterHelper from '@/helpers/CharacterHelper';
import { CharacterImage } from '@/Enums/CharacterEnums';
import { Icon } from '@iconify/vue';
</script>

<style lang="scss">
.home-menu__left-side-info {
	width: 30%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	height: 100%;

	img {
		background-color: #dd8e5d;
		border-radius: 50%;
		width: 55%;
		height: auto;
		border: 4px solid white;
	}

	figcaption {
		margin-top: 15px;
		background-color: rgba(0, 0, 0, 0.411);
		padding: 0px 5px;
		font-size: 17px;
		font-weight: bold;
		color: white;
		text-align: center;
		border-radius: 20px;

	}

	button {
		background-color: transparent;
		margin-top: 10px;
		color: rgba(255, 255, 255, 0.473);
		font-size: 17px;
	}
}

@media only screen and (max-width: 915px) {
	.home-menu__left-side-info {
		width: 30%;

		img {
			width: 80%;
			max-width: 80px;
		}

		figcaption {
			font-size: 11px !important;
			margin-top: 8px;
		}

		button {
			margin-top: 5px;
			font-size: 12px;
		}
	}
}
</style>