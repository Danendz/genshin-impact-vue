<template>
    <div v-if="characters === ErrorMessages.NOT_FOUND">
        <ErrorPage :errorMessage="ErrorMessages.NOT_FOUND" />
    </div>
    <div v-else-if="characters">
        <CharactersList />
    </div>
    <div v-else>Loading...</div>
</template>

<script setup lang="ts">
//composables
import { useGetCharacters } from '@/Composables/useGetCharacters'
import { useGetWeapons } from '@/Composables/useGetWeapons'

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages'

//components
import ErrorPage from '@/components/UI/ErrorPage.vue';
import CharactersList from '../components/CharactersList.vue';

//vue
import { useStore } from 'vuex';
import { watch } from 'vue';

const store = useStore()
const { characters } = useGetCharacters()
const { weapons } = useGetWeapons()

watch(characters, () => {
    store.commit('setCharacters', characters)
})
watch(weapons, () => {
    store.commit('setWeapons', weapons)
})
</script>