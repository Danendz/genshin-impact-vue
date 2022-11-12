<template>
	<HomeModal @set-modal="props.setModal" :title="'Change Avatar'">
		<section v-if="getCharacters && selectedAvatar" class="change-avatar-container">
			<AvatarList :characters="getCharacters" :selected-avatar="selectedAvatar"
				@set-selected-avatar="setSelectedAvatar" />
			<SelectedAvatar @confirm-selection="confirmSelection" :selected-avatar="selectedAvatar" />
		</section>
	</HomeModal>
</template>


<script setup lang="ts">
//components
import HomeModal from '@/components/UI/HomeModal.vue';
import AvatarList from './AvatarList.vue';
import SelectedAvatar from './SelectedAvatar.vue';

//stores
import { useCharacters } from '@/store/Characters/Characters';
import { useUserData } from '@/store/Home/UserData';

//interfaces
import { ISelectedAvatar } from '@/Interfaces/SelectedAvatar';

//vue
import { ref, computed, onMounted, watch } from 'vue';

const props = defineProps<{
	setModal: (value: boolean) => void,
	activeState: boolean
}>()

const { getCharacters } = useCharacters()

const { getUser, setAvatar } = useUserData()

const selectedAvatar = ref<ISelectedAvatar | null>(null)

const setSelectedAvatar = (name_key: string) => {
	if (getCharacters.value) {
		selectedAvatar.value = {
			name: nameByNameKey.value[name_key],
			name_key
		}
	}
}

const confirmSelection = () => {
	if (selectedAvatar.value) {
		setAvatar(selectedAvatar.value.name_key)
		props.setModal(false)
	}
}

const nameByNameKey = computed(() => {
	if (getCharacters.value) {
		return getCharacters.value.reduce((prev: { [name_key: string]: string }, character) => {
			prev[character.name_key] = character.name;
			return prev;
		}, {})
	}
	return {}
})

onMounted(() => {
	setSelectedAvatar(getUser.value.userAvatar)
})

watch(() => props.activeState, () => {
	if (props.activeState) {
		setSelectedAvatar(getUser.value.userAvatar)
	}
})

</script> 


<style lang="scss">
.change-avatar-container {
	display: flex;
	gap: 10px;
	width: 100%;
	height: 100%;
}

@media only screen and (orientation: portrait) {
	.change-avatar-container {
		flex-direction: column;
	}
}
</style>
