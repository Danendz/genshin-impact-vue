<template>
	<figure class="home-menu__left-side-info">
		<CircleCharacter :delay="0" @click="setModal(true)" class="home-menu__left-side-icon"
			:name_key="getUser.userAvatar" />

		<figcaption :style="{ userSelect: 'none' }" @click="() => setPopupShow(true)">UID {{ getUser.UID }}
			<PopUp :arrow-class="'home-menu__popup-copy-arrow'" @hide-popup="setPopupShow" :is-visible="popupShow"
				:popup-text="'Успешно скопировано!'" :popup-class="'home-menu__success-copy'" />
		</figcaption>

		<button @click="() => setPopupShow(true)">
			<Icon icon="material-symbols:file-copy-sharp" />Copy
		</button>

	</figure>

	<ModalWindow @close-modal="setModal" :is-bg-transparent="true" :active_state="modalState"
		:modal-style="'popupModal'">
		<Suspense v-if="modalLoaded">
			<template #default>
				<ChangeAvatar :activeState="modalState" :set-modal="setModal" />
			</template>
			<template #fallback>
				<LoaderSpinner />
			</template>
		</Suspense>
	</ModalWindow>

</template>


<script setup lang="ts">
//iconify
import { Icon } from '@iconify/vue';

//components
import PopUp from '@/components/UI/PopUp.vue';
import CircleCharacter from '@/components/UI/CircleCharacter.vue';
import ModalWindow from '@/components/UI/ModalWindow.vue';
import LoaderSpinner from '@/components/UI/LoaderSpinner.vue';

//stores
import { useUserData } from '@/store/Home/UserData';

//vue
import { ref, defineAsyncComponent } from 'vue';

const ChangeAvatar = defineAsyncComponent(() => import('../../HomeModals/ChangeAvatar/ChangeAvatar.vue'))

const popupShow = ref(false)
const { getUser } = useUserData()

const modalState = ref(false)
const modalLoaded = ref(false)

const setModal = (value: boolean) => {
	modalState.value = value
	if (!modalLoaded.value) {
		modalLoaded.value = true
	}
}

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

	.home-menu__left-side-icon {
		background-color: #dd8e5d;
		max-width: 120px;
		max-height: 120px;
		border-radius: 50%;
		border: 4px solid white;
		cursor: pointer;

		&:active {
			opacity: 0.7;
		}
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

		.home-menu__left-side-icon {
			max-width: 80px;
			max-height: 80px;
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