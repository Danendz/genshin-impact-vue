<template>
	<figure class="home-menu__left-side-info">
		<img draggable="false"
			:src="CharacterHelper.getCharacterImage(getUser.userAvatar, CharacterImage.ICON_BIG_LQ)" />
		<figcaption :style="{ userSelect: 'none' }" @click="() => setPopupShow(true)">UID {{ getUser.UID }}
			<PopUp :arrow-class="'home-menu__popup-copy-arrow'" @hide-popup="setPopupShow" :is-visible="popupShow"
				:popup-text="'Успешно скопировано!'" :popup-class="'home-menu__success-copy'" />
		</figcaption>
		<button @click="() => setPopupShow(true)">
			<Icon icon="material-symbols:file-copy-sharp" />Copy
		</button>
	</figure>
	<!-- <ModalWindow :is-bg-transparent="true" :active_state="true" :modal-style="'default'">
		<ChangeAvatar />
	</ModalWindow> -->
</template>


<script setup lang="ts">
//enums
import { CharacterImage } from '@/Enums/CharacterEnums';

//helpers
import CharacterHelper from '@/helpers/CharacterHelper';

//iconify
import { Icon } from '@iconify/vue';

//components
import PopUp from '@/components/UI/PopUp.vue';

//vue
import { ref } from 'vue';
import { useUserData } from '@/store/Home/UserData';
import ChangeAvatar from '../../HomeModals/ChangeAvatar.vue';
import ModalWindow from '@/components/UI/ModalWindow.vue';

const popupShow = ref(false)
const { getUser } = useUserData()



const setPopupShow = (value: boolean) => {
	if (value) navigator.clipboard.writeText(getUser.value.UID.toString())
	popupShow.value = value
}

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
		font-size: 15px;

		color: white;
		display: flex;
		justify-content: center;
		text-align: center;
		position: relative;
		border-radius: 20px;
	}

	button {
		background-color: transparent;
		margin-top: 10px;
		color: rgb(255, 255, 255);
		opacity: 0.5;
		font-size: 17px;

		&:hover {
			opacity: 0.8;
		}

		&:active {
			opacity: 1;
		}
	}
}

.home-menu__success-copy {
	top: calc(100% + 15px);
}

.home-menu__popup-copy-arrow {
	bottom: calc(100% - 0.35px);
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

	.home-menu__success-copy {
		top: calc(100% + 10px);

		p {
			font-size: 10px !important;
		}
	}

	.home-menu__popup-copy-arrow {
		top: -10px;
	}
}
</style>