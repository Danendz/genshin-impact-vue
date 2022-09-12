<template>
    <div v-if="characters === ErrorMessages.NOT_FOUND">
        <ErrorPage :errorMessage="ErrorMessages.NOT_FOUND" />
    </div>
    <div v-else-if="characters">
        <p v-for="character in characters" :key="character.name">
            {{character.name}}
        </p>
    </div>
    <div v-else>Loading...</div>
</template>

<script setup lang="ts">
//interfaces
import { Weapon } from '@/Interfaces/WeaponInterface';
import { Character } from '@/Interfaces/CharacterInterface'

//enums
import { ErrorMessages } from '@/Enums/ErrorMessages'

//api
import WeaponService from '@/API/WeaponService';
import CharacterService from '@/API/CharacterService'

//components
import ErrorPage from '@/components/UI/ErrorPage.vue';

//vue
import { onMounted, ref } from 'vue';

const characterService = new CharacterService()
const weaponService = new WeaponService()
const characters = ref<Character[] | null | ErrorMessages.NOT_FOUND>(null)
const weapons = ref<Weapon[] | null | ErrorMessages.NOT_FOUND>(null)

const getCharacters = async () => {
    const data: Character[] | ErrorMessages.NOT_FOUND = await characterService.get<Character>();
    characters.value = data
}

const getWeapons = async () => {
    const data: Weapon[] | ErrorMessages.NOT_FOUND = await weaponService.get<Weapon>();
    weapons.value = data
}

onMounted(() => {
    getCharacters()
    getWeapons();
})
</script>